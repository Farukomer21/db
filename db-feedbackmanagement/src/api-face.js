const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - feedbackManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "feedbackManagement",
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
        name: "Feedback",
        description:
          "Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.",
        reference: {
          tableName: "feedback",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "guestName",
              type: "String",
            },

            {
              name: "rating",
              type: "Integer",
            },

            {
              name: "comment",
              type: "Text",
            },

            {
              name: "submittedAt",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "POST",
            url: `${basePath}/v1/feedbackguest`,
            title: "Create Feedbackguest",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                guestName: "String",
                rating: "Integer",
                comment: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Get Feedback",
            query: [],

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Update Feedback",
            query: [],

            body: {
              type: "json",
              content: {
                guestName: "String",
                rating: "Integer",
                comment: "Text",
              },
            },

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/feedbacks/{feedbackId}`,
            title: "Delete Feedback",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "feedbackId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/feedbacks`,
            title: "List Feedbacks",
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
