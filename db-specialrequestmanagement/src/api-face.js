const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - specialRequestManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "specialRequestManagement",
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
        name: "SpecialRequest",
        description:
          "Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.",
        reference: {
          tableName: "specialRequest",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "guestId",
              type: "ID",
            },

            {
              name: "requestText",
              type: "String",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "response",
              type: "String",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/specialrequests`,
            title: "Create Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                guestId: "ID",
                requestText: "String",
                status: "Enum",
                response: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Update Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                guestId: "ID",
                requestText: "String",
                status: "Enum",
                response: "String",
              },
            },

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Get Specialrequest",
            query: [],

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/specialrequests/{specialRequestId}`,
            title: "Delete Specialrequest",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/specialrequests`,
            title: "List Specialrequests",
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
            method: "POST",
            url: `${basePath}/v1/specialrequestpublic`,
            title: "Create Specialrequestpublic",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                guestId: "ID",
                requestText: "String",
                status: "Enum",
                response: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/specialrequestsbycode`,
            title: "List Specialrequestsbycode",
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
            url: `${basePath}/v1/specialrequestbycode/{specialRequestId}`,
            title: "Get Specialrequestbycode",
            query: [],

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/cancelspecialrequestbycode/{specialRequestId}`,
            title: "Cancel Specialrequestbycode",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                guestId: "ID",
                requestText: "String",
                status: "Enum",
                response: "String",
              },
            },

            parameters: [
              {
                key: "specialRequestId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },
        ],
      },
    ],
  };

  inject(app, config);
};
