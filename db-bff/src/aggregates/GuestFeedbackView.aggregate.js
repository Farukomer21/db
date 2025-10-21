const { elasticClient } = require("common/elasticsearch");

const getAllGuestFeedbackView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "db_feedback",
      body: {
        query: query,
        _source: [
          "id",
          "reservationId",
          "guestName",
          "rating",
          "comment",
          "submittedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reservationAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in feedbackAggregateData", error);
    //**errorLog
  }
};

const getGuestFeedbackView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "db_feedback",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "reservationId",
          "guestName",
          "rating",
          "comment",
          "submittedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reservationAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in feedbackAggregateData", error);
    //**errorLog
  }
};

const reservationAggregateDataFromIndex = async (source) => {
  if (!source["reservationId"]) return;
  const aggregation = await elasticClient.search({
    index: "db_reservation",
    body: {
      query: {
        match: {
          id: source["reservationId"],
        },
      },
      _source: ["id", "checkInDate", "checkOutDate", "roomId", "guestId"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["reservation"] = aggregation.hits.hits[0]?._source;
  }
};

const roomAggregateDataFromIndex = async (source) => {
  if (!source["reservation"]) return;
  const aggregation = await elasticClient.search({
    index: "db_room",
    body: {
      query: {
        match: {
          id: source["reservation"],
        },
      },
      _source: ["id", "roomNumber", "type"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["room"] = aggregation.hits.hits[0]?._source;
  }
};

const roomTypeLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["room.type"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_roomType",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["room.type"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllGuestFeedbackView,
  getGuestFeedbackView,
  reservationAggregateDataFromIndex,
  roomAggregateDataFromIndex,
  roomTypeLabelLookupDataFromIndex,
};
