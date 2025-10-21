const { elasticClient } = require("common/elasticsearch");

const getAllReservationDetailsView = async (filter = null) => {
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
          "createdAt",
          "updatedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomPriceDetailAggregateDataFromIndex(source));

      promises.push(paymentAggregateDataFromIndex(source));

      promises.push(selectedPackagesAggregateDataFromIndex(source));

      promises.push(packageReservationsAggregateDataFromIndex(source));

      promises.push(specialRequestsAggregateDataFromIndex(source));

      promises.push(reservationStatusLabelLookupDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      promises.push(paymentMethodLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in reservationAggregateData", error);
    //**errorLog
  }
};

const getReservationDetailsView = async (id) => {
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
          "createdAt",
          "updatedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(guestAggregateDataFromIndex(source));

      promises.push(roomAggregateDataFromIndex(source));

      promises.push(roomPriceDetailAggregateDataFromIndex(source));

      promises.push(paymentAggregateDataFromIndex(source));

      promises.push(selectedPackagesAggregateDataFromIndex(source));

      promises.push(packageReservationsAggregateDataFromIndex(source));

      promises.push(specialRequestsAggregateDataFromIndex(source));

      promises.push(reservationStatusLabelLookupDataFromIndex(source));

      promises.push(roomTypeLabelLookupDataFromIndex(source));

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      promises.push(paymentMethodLabelLookupDataFromIndex(source));

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
      _source: ["id", "fullname", "email", "phoneNumber"],
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
      _source: [
        "id",
        "roomNumber",
        "type",
        "bedType",
        "capacity",
        "floor",
        "description",
      ],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["room"] = aggregation.hits.hits[0]?._source;
  }
};

const roomPriceDetailAggregateDataFromIndex = async (source) => {
  if (!source["roomId"]) return;
  const aggregation = await elasticClient.search({
    index: "db_roomprice",
    body: {
      query: {
        match: {
          roomId: source["roomId"],
        },
      },
      _source: ["id", "startDate", "endDate", "price", "priceType"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["roomPriceDetail"] = aggregation.hits.hits[0]?._source;
  }
};

const paymentAggregateDataFromIndex = async (source) => {
  if (!source["paymentId"]) return;
  const aggregation = await elasticClient.search({
    index: "db_payment",
    body: {
      query: {
        match: {
          id: source["paymentId"],
        },
      },
      _source: [
        "id",
        "amount",
        "paymentStatus",
        "paymentMethod",
        "processedAt",
        "gatewayReference",
      ],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["payment"] = aggregation.hits.hits[0]?._source;
  }
};

const selectedPackagesAggregateDataFromIndex = async (source) => {
  if (!source["packages"]) return;
  const aggregation = await elasticClient.search({
    index: "db_package_",
    body: {
      query: {
        match: {
          id: source["packages"],
        },
      },
      _source: ["id", "name", "description", "price", "duration", "conditions"],
    },
  });

  source["selectedPackages"] = aggregation.hits.hits.map((hit) => hit._source);
};

const packageReservationsAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "db_packagereservation",
    body: {
      query: {
        match: {
          reservationId: source["id"],
        },
      },
      _source: ["id", "packageId", "priceAtBooking", "notes"],
    },
  });

  source["packageReservations"] = aggregation.hits.hits.map(
    (hit) => hit._source,
  );
};

const specialRequestsAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "db_specialrequest",
    body: {
      query: {
        match: {
          reservationId: source["id"],
        },
      },
      _source: ["id", "requestText", "status", "response", "createdAt"],
    },
  });

  source["specialRequests"] = aggregation.hits.hits.map((hit) => hit._source);
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

const paymentStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["payment.paymentStatus"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_paymentStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["payment.paymentStatus"] = lookupData.hits.hits[0]?._source;
  }
};

const paymentMethodLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["payment.paymentMethod"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "db_paymentMethod",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["payment.paymentMethod"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllReservationDetailsView,
  getReservationDetailsView,
  guestAggregateDataFromIndex,
  roomAggregateDataFromIndex,
  roomPriceDetailAggregateDataFromIndex,
  paymentAggregateDataFromIndex,
  selectedPackagesAggregateDataFromIndex,
  packageReservationsAggregateDataFromIndex,
  specialRequestsAggregateDataFromIndex,
  reservationStatusLabelLookupDataFromIndex,
  roomTypeLabelLookupDataFromIndex,
  paymentStatusLabelLookupDataFromIndex,
  paymentMethodLabelLookupDataFromIndex,
};
