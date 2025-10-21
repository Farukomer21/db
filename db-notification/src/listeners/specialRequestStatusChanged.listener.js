const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-specialRequestStatusChanged-group`,
});

const specialRequestStatusChangedListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "specialRequestManagement.specialRequest.statusChanged",
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
          template: "specialRequestStatusEmailTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.id;
        const dataSource = await getDocument(
          "db_SpecialRequestDetailsView",
          dataViewId,
        );

        this.dataSource = dataSource.source;
        mappedData.metadata = {
          ...mappedData.metadata,
          dataSource: dataSource.source,
        };

        if (
          !(
            this.dataSource.status == "fulfilled" ||
            this.dataSource.status == "canceled"
          )
        ) {
          console.log(
            "condition not met",
            "this.dataSource.status==&#39;fulfilled&#39;||this.dataSource.status==&#39;canceled&#39;",
          );
          return;
        }

        const targetguest = mappedData.metadata.dataSource["guest.fullname"];
        mappedData.to = targetguest;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error(
          "specialRequestManagement.specialRequest.statusChanged ",
          error,
        );
      }
    },
  });
};

module.exports = specialRequestStatusChangedListener;
