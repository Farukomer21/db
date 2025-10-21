const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - guestManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "guestManagement",
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
        name: "Guest",
        description:
          "Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.",
        reference: {
          tableName: "guest",
          properties: [
            {
              name: "fullname",
              type: "String",
            },

            {
              name: "email",
              type: "String",
            },

            {
              name: "phoneNumber",
              type: "String",
            },

            {
              name: "address",
              type: "Text",
            },

            {
              name: "notes",
              type: "Text",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/guests`,
            title: "Create Guest",
            query: [],

            body: {
              type: "json",
              content: {
                fullname: "String",
                email: "String",
                phoneNumber: "String",
                address: "Text",
                notes: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Update Guest",
            query: [],

            body: {
              type: "json",
              content: {
                fullname: "String",
                email: "String",
                phoneNumber: "String",
                address: "Text",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Get Guest",
            query: [],

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/guests/{guestId}`,
            title: "Delete Guest",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "guestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/guests`,
            title: "List Guests",
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
