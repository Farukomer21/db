const {
  getAllReservationDetailsView,
  getReservationDetailsView,
} = require("aggregates/ReservationDetailsView.aggregate");

const getAllAggReservationDetailsView = async () => {
  try {
    const data = await getAllReservationDetailsView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggReservationDetailsView = async (id) => {
  try {
    const data = await getReservationDetailsView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggReservationDetailsView,
  getAggReservationDetailsView,
};
