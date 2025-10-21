const { elasticClient } = require("common/elasticsearch");

const getAllReservationListSummaryView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "db_reservation",
      body: {
        query: query,
        _source: [
          "id",
          "reservationCode",
          "checkInDate",
          "checkOutDate",
          "status",
          "numGuests",
          "totalPrice",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(reservationStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in reservationAggregateData", error);
    //**errorLog
  }
};

const getReservationListSummaryView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "db_reservation",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "reservationCode",
          "checkInDate",
          "checkOutDate",
          "status",
          "numGuests",
          "totalPrice",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(reservationStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in reservationAggregateData", error);
    //**errorLog
  }
};

const guestAggregateDataFromIndex = async (source) => {
  if (!source["guestId"]) return;
  const aggregation = await elasticClient.search({
    index: "db_guest",
    body: {
      query: {
        match: {
          id: source["guestId"],
        },
      },
      _source: ["id", "fullname"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["guest"] = aggregation.hits.hits[0]?._source;
  }
};

const roomAggregateDataFromIndex = async (source) => {
  if (!source["roomId"]) return;
  const aggregation = await elasticClient.search({
    index: "db_room",
    body: {
      query: {
        match: {
          id: source["roomId"],
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

const reservationStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_reservationStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllReservationListSummaryView,
  getReservationListSummaryView,
  guestAggregateDataFromIndex,
  roomAggregateDataFromIndex,
  roomTypeLabelLookupDataFromIndex,
  reservationStatusLabelLookupDataFromIndex,
};
