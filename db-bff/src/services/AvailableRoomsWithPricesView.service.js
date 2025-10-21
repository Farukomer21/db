const {
  getAllAvailableRoomsWithPricesView,
  getAvailableRoomsWithPricesView,
} = require("aggregates/AvailableRoomsWithPricesView.aggregate");

const getAllAggAvailableRoomsWithPricesView = async () => {
  try {
    const data = await getAllAvailableRoomsWithPricesView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggAvailableRoomsWithPricesView = async (id) => {
  try {
    const data = await getAvailableRoomsWithPricesView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggAvailableRoomsWithPricesView,
  getAggAvailableRoomsWithPricesView,
};
