const { elasticClient } = require("common/elasticsearch");

const getAllSpecialRequestDetailsView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "db_specialrequest",
      body: {
        query: query,
        _source: [
          "id",
          "reservationId",
          "guestId",
          "requestText",
          "status",
          "createdAt",
          "updatedAt",
          "response",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reservationAggregateDataFromIndex(source));

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(specialRequestStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in specialrequestAggregateData", error);
    //**errorLog
  }
};

const getSpecialRequestDetailsView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "db_specialrequest",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "reservationId",
          "guestId",
          "requestText",
          "status",
          "createdAt",
          "updatedAt",
          "response",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(reservationAggregateDataFromIndex(source));

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(specialRequestStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in specialrequestAggregateData", error);
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
      _source: [
        "id",
        "reservationCode",
        "checkInDate",
        "checkOutDate",
        "numGuests",
      ],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["reservation"] = aggregation.hits.hits[0]?._source;
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

const specialRequestStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_specialRequestStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllSpecialRequestDetailsView,
  getSpecialRequestDetailsView,
  reservationAggregateDataFromIndex,
  guestAggregateDataFromIndex,
  specialRequestStatusLabelLookupDataFromIndex,
};
