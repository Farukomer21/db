const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - paymentManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "paymentManagement",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "Payment",
        description:
          "Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.",
        reference: {
          tableName: "payment",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "amount",
              type: "Double",
            },

            {
              name: "paymentStatus",
              type: "Enum",
            },

            {
              name: "paymentMethod",
              type: "Enum",
            },

            {
              name: "gatewayReference",
              type: "String",
            },

            {
              name: "processedAt",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/payments`,
            title: "Create Payment",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                amount: "Double",
                paymentStatus: "Enum",
                paymentMethod: "Enum",
                gatewayReference: "String",
                processedAt: "Date",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Update Payment",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                amount: "Double",
                paymentStatus: "Enum",
                paymentMethod: "Enum",
                gatewayReference: "String",
                processedAt: "Date",
              },
            },

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Delete Payment",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/payments/{paymentId}`,
            title: "Get Payment",
            query: [],

            parameters: [
              {
                key: "paymentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/payments`,
            title: "List Payments",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },
        ],
      },
    ],
  };

  inject(app, config);
};
