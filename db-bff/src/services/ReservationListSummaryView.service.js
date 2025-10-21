const {
  getAllReservationListSummaryView,
  getReservationListSummaryView,
} = require("aggregates/ReservationListSummaryView.aggregate");

const getAllAggReservationListSummaryView = async () => {
  try {
    const data = await getAllReservationListSummaryView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggReservationListSummaryView = async (id) => {
  try {
    const data = await getReservationListSummaryView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggReservationListSummaryView,
  getAggReservationListSummaryView,
};
