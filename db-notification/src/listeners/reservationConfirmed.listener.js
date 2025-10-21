const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-reservationConfirmed-group`,
});

const reservationConfirmedListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "reservationManagement.reservation.paymentConfirmed",
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
          template: "reservationConfirmedEmailTemplate",
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
            this.dataSource.status == "confirmed" &&
            !!this.dataSource.reservationCode
          )
        ) {
          console.log(
            "condition not met",
            "this.dataSource.status==&#39;confirmed&#39; &amp;&amp; !!this.dataSource.reservationCode",
          );
          return;
        }

        const targetguest = mappedData.metadata.dataSource["guest.email"];
        mappedData.to = targetguest;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error(
          "reservationManagement.reservation.paymentConfirmed ",
          error,
        );
      }
    },
  });
};

module.exports = reservationConfirmedListener;
