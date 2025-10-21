const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-paymentFailed-group`,
});

const paymentFailedListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "paymentManagement.payment.statusChanged",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const notice = JSON.parse(message.value.toString());

        const mappedData = {
          types: ["email"],
          isStored: false,
          template: "paymentFailedEmailTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.payment.reservationId;
        const dataSource = await getDocument(
          "db_ReservationDetailsView",
          dataViewId,
        );

        this.dataSource = dataSource.source;
        mappedData.metadata = {
          ...mappedData.metadata,
          dataSource: dataSource.source,
        };

        if (!(this.dataSource.paymentStatus == "failed")) {
          console.log(
            "condition not met",
            "this.dataSource.paymentStatus==&#39;failed&#39;",
          );
          return;
        }

        const targetguest = mappedData.metadata.dataSource["guest.email"];
        mappedData.to = targetguest;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error("paymentManagement.payment.statusChanged ", error);
      }
    },
  });
};

module.exports = paymentFailedListener;
