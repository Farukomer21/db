const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - roomPricing",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "roomPricing",
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
        name: "RoomPrice",
        description:
          "Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.",
        reference: {
          tableName: "roomPrice",
          properties: [
            {
              name: "roomId",
              type: "ID",
            },

            {
              name: "startDate",
              type: "Date",
            },

            {
              name: "endDate",
              type: "Date",
            },

            {
              name: "price",
              type: "Double",
            },

            {
              name: "priceType",
              type: "Enum",
            },

            {
              name: "description",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/roomprices`,
            title: "Create Roomprice",
            query: [],

            body: {
              type: "json",
              content: {
                roomId: "ID",
                startDate: "Date",
                endDate: "Date",
                price: "Double",
                priceType: "Enum",
                description: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/roomprices/{roomPriceId}`,
            title: "Update Roomprice",
            query: [],

            body: {
              type: "json",
              content: {
                roomId: "ID",
                startDate: "Date",
                endDate: "Date",
                price: "Double",
                priceType: "Enum",
                description: "String",
              },
            },

            parameters: [
              {
                key: "roomPriceId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/roomprices/{roomPriceId}`,
            title: "Delete Roomprice",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "roomPriceId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/roomprices/{roomPriceId}`,
            title: "Get Roomprice",
            query: [],

            parameters: [
              {
                key: "roomPriceId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/roomprices`,
            title: "List Roomprices",
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
