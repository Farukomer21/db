const jwt = require("jsonwebtoken");

const PublicObjectEvents = {
  reservation: [
    "db-reservationmanagement-service-reservation-created",
    "db-reservationmanagement-service-reservation-updated",
    "db-reservationmanagement-service-reservation-retrived",
    "db-reservationmanagement-service-reservation-deleted",
    "db-reservationmanagement-service-reservations-listed",
    "db-reservationmanagement-service-reservationguest-created",
    "db-reservationmanagement-service-reservationpayment-confirmed",
    "db-reservationmanagement-service-reservationbycode-retrived",
    "db-reservationmanagement-service-reservationbycode-updated",
    "db-reservationmanagement-service-reservationbycode-canceled",
  ],
};

const ProtectedObjectEvents = {};

const PrivateObjectEvents = {};

const createAdminToken = async (session) => {
  // add all topics if superAdmin,saasAdmin,admin
  // add tenantLevel topics if tenantAdmin
  // add tenantId condition tenantAdmin
  // add tenantId condition if superAdmin and saasAdmin if subscription request in tenantLevel

  const topics = [];

  for (const key of Object.keys(PublicObjectEvents)) {
    topics.push(...PublicObjectEvents[key]);
  }
  for (const key of Object.keys(ProtectedObjectEvents)) {
    topics.push(...ProtectedObjectEvents[key]);
  }
  for (const key of Object.keys(PrivateObjectEvents)) {
    topics.push(...PrivateObjectEvents[key]);
  }

  const payload = {
    rights: [
      {
        topics: topics,
      },
    ],
  };

  const jwtKey = process.env.PROJECT_TOKEN_KEY ?? "realtime.token.key";
  return jwt.sign(payload, jwtKey);
};

const createUserToken = async (session) => {
  const topics = [];

  for (const key of Object.keys(PublicObjectEvents)) {
    topics.push(...PublicObjectEvents[key]);
  }

  for (const key of Object.keys(ProtectedObjectEvents)) {
    topics.push(...ProtectedObjectEvents[key]);
  }

  const payload = {
    rights: [
      {
        topics: topics,
      },
    ],
  };

  const privateTopics = [];
  for (const key of Object.keys(PrivateObjectEvents)) {
    privateTopics.push(...PrivateObjectEvents[key]);
  }

  payload.rights.push({
    topics: privateTopics,
    logic: {
      type: "eq",
      key: "_ownerId",
      value: session.userId,
    },
  });

  const jwtKey = process.env.PROJECT_TOKEN_KEY ?? "realtime.token.key";
  return jwt.sign(payload, jwtKey);
};

const createEventToken = async (session) => {
  if (!session) return null;
  const userRole = session.roleId;
  const adminRoles = ["superAdmin", "admin"];
  if (adminRoles.includes(userRole)) {
    return await createAdminToken(session);
  }
  return await createUserToken(session);
};

module.exports = createEventToken;
