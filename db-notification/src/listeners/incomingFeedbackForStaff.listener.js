const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `db-notification-service-incomingFeedbackForStaff-group`,
});

const incomingFeedbackForStaffListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "feedbackManagement.feedback.createdByGuest",
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
          template: "incomingFeedbackStaffInAppTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.id;
        const dataSource = await getDocument(
          "db_GuestFeedbackView",
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
        console.error("feedbackManagement.feedback.createdByGuest ", error);
      }
    },
  });
};

module.exports = incomingFeedbackForStaffListener;
