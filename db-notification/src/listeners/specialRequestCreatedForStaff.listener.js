const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-specialRequestCreatedForStaff-group`,
});

const specialRequestCreatedForStaffListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "specialRequestManagement.specialRequest.createdByGuest",
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
          types: ["inApp"],
          isStored: true,
          template: "specialRequestCreatedStaffInAppTemplate",
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

        const targetstaffAll = mappedData.metadata.dataSource[""];
        mappedData.to = targetstaffAll;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error(
          "specialRequestManagement.specialRequest.createdByGuest ",
          error,
        );
      }
    },
  });
};

module.exports = specialRequestCreatedForStaffListener;
