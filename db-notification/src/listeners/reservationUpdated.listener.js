const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-reservationUpdated-group`,
});

const reservationUpdatedListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "reservationManagement.reservation.updatedByStaff",
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
          template: "reservationUpdatedEmailTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.id;
        const dataSource = await getDocument(
          "db_ReservationDetailsView",
          dataViewId,
        );

        this.dataSource = dataSource.source;
        mappedData.metadata = {
          ...mappedData.metadata,
          dataSource: dataSource.source,
        };

        if (
          !(
            this.dataSource.status == "confirmed" ||
            this.dataSource.status == "pending"
          )
        ) {
          console.log(
            "condition not met",
            "this.dataSource.status==&#39;confirmed&#39;||this.dataSource.status==&#39;pending&#39;",
          );
          return;
        }

        const targetguest = mappedData.metadata.dataSource["guest.email"];
        mappedData.to = targetguest;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error(
          "reservationManagement.reservation.updatedByStaff ",
          error,
        );
      }
    },
  });
};

module.exports = reservationUpdatedListener;
