const {
  getAllSpecialRequestDetailsView,
  getSpecialRequestDetailsView,
} = require("aggregates/SpecialRequestDetailsView.aggregate");

const getAllAggSpecialRequestDetailsView = async () => {
  try {
    const data = await getAllSpecialRequestDetailsView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggSpecialRequestDetailsView = async (id) => {
  try {
    const data = await getSpecialRequestDetailsView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggSpecialRequestDetailsView,
  getAggSpecialRequestDetailsView,
};
