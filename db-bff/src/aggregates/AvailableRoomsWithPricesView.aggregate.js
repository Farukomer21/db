const { elasticClient } = require("common/elasticsearch");

const getAllAvailableRoomsWithPricesView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "db_room",
      body: {
        query: query,
        _source: [
          "id",
          "roomNumber",
          "floor",
          "type",
          "capacity",
          "bedType",
          "amenities",
          "status",
          "description",
          "images",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(currentPricesAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(roomStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in roomAggregateData", error);
    //**errorLog
  }
};

const getAvailableRoomsWithPricesView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "db_room",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "roomNumber",
          "floor",
          "type",
          "capacity",
          "bedType",
          "amenities",
          "status",
          "description",
          "images",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(currentPricesAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(roomStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in roomAggregateData", error);
    //**errorLog
  }
};

const currentPricesAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "db_roomprice",
    body: {
      query: {
        match: {
          roomId: source["id"],
        },
      },
      _source: ["id", "startDate", "endDate", "price", "priceType"],
    },
  });

  source["currentPrices"] = aggregation.hits.hits.map((hit) => hit._source);
};

const roomTypeLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["type"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_roomType",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["type"] = lookupData.hits.hits[0]?._source;
  }
};

const roomStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_roomStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllAvailableRoomsWithPricesView,
  getAvailableRoomsWithPricesView,
  currentPricesAggregateDataFromIndex,
  roomTypeLabelLookupDataFromIndex,
  roomStatusLabelLookupDataFromIndex,
};
