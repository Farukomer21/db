const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - packageReservationMapping",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "packageReservationMapping",
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
        name: "PackageReservation",
        description:
          "Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.",
        reference: {
          tableName: "packageReservation",
          properties: [
            {
              name: "reservationId",
              type: "ID",
            },

            {
              name: "packageId",
              type: "ID",
            },

            {
              name: "priceAtBooking",
              type: "Double",
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
            url: `${basePath}/v1/packagereservations`,
            title: "Create Packagereservation",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                packageId: "ID",
                priceAtBooking: "Double",
                notes: "String",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/packagereservations/{packageReservationId}`,
            title: "Update Packagereservation",
            query: [],

            body: {
              type: "json",
              content: {
                reservationId: "ID",
                packageId: "ID",
                priceAtBooking: "Double",
                notes: "String",
              },
            },

            parameters: [
              {
                key: "packageReservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/packagereservations/{packageReservationId}`,
            title: "Delete Packagereservation",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "packageReservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/packagereservations/{packageReservationId}`,
            title: "Get Packagereservation",
            query: [],

            parameters: [
              {
                key: "packageReservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/packagereservations`,
            title: "List Packagereservations",
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
