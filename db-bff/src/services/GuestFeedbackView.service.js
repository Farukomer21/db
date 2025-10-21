const {
  getAllGuestFeedbackView,
  getGuestFeedbackView,
} = require("aggregates/GuestFeedbackView.aggregate");

const getAllAggGuestFeedbackView = async () => {
  try {
    const data = await getAllGuestFeedbackView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggGuestFeedbackView = async (id) => {
  try {
    const data = await getGuestFeedbackView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = { getAllAggGuestFeedbackView, getAggGuestFeedbackView };
