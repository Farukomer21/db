const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - personnelManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "personnelManagement",
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
        name: "Personnel",
        description:
          "Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.",
        reference: {
          tableName: "personnel",
          properties: [
            {
              name: "name",
              type: "String",
            },

            {
              name: "jobTitle",
              type: "String",
            },

            {
              name: "department",
              type: "String",
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
              name: "contactInfo",
              type: "String",
            },

            {
              name: "notes",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/personnels`,
            title: "Create Personnel",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                jobTitle: "String",
                department: "String",
                startDate: "Date",
                endDate: "Date",
                contactInfo: "String",
                notes: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Update Personnel",
            query: [],

            body: {
              type: "json",
              content: {
                name: "String",
                jobTitle: "String",
                department: "String",
                startDate: "Date",
                endDate: "Date",
                contactInfo: "String",
                notes: "String",
              },
            },

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Delete Personnel",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/personnels/{personnelId}`,
            title: "Get Personnel",
            query: [],

            parameters: [
              {
                key: "personnelId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/personnels`,
            title: "List Personnels",
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
