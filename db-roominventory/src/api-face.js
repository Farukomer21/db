const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - roomInventory",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "roomInventory",
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
        name: "Room",
        description:
          "Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.",
        reference: {
          tableName: "room",
          properties: [
            {
              name: "roomNumber",
              type: "String",
            },

            {
              name: "floor",
              type: "Integer",
            },

            {
              name: "type",
              type: "Enum",
            },

            {
              name: "capacity",
              type: "Integer",
            },

            {
              name: "bedType",
              type: "String",
            },

            {
              name: "amenities",
              type: "[String]",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "description",
              type: "Text",
            },

            {
              name: "images",
              type: "[String]",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Update Room",
            query: [],

            body: {
              type: "json",
              content: {
                roomNumber: "String",
                floor: "Integer",
                type: "Enum",
                capacity: "Integer",
                bedType: "String",
                amenities: "String",
                status: "Enum",
                description: "Text",
                images: "String",
              },
            },

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Get Room",
            query: [],

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/rooms/{roomId}`,
            title: "Delete Room",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "roomId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/rooms`,
            title: "List Rooms",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/availablerooms`,
            title: "List Availablerooms",
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
