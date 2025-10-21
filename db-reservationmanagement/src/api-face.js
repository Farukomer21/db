const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const basePath =
    process.env.SERVICE_URL_SUFFIX ?? `${process.env.SERVICE_SHORT_NAME}-api`;
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: basePath,
    name: "db - reservationManagement",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "reservationManagement",
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
        name: "Reservation",
        description:
          "Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.",
        reference: {
          tableName: "reservation",
          properties: [
            {
              name: "guestId",
              type: "ID",
            },

            {
              name: "roomId",
              type: "ID",
            },

            {
              name: "checkInDate",
              type: "Date",
            },

            {
              name: "checkOutDate",
              type: "Date",
            },

            {
              name: "reservationCode",
              type: "String",
            },

            {
              name: "packages",
              type: "[ID]",
            },

            {
              name: "specialRequests",
              type: "[ID]",
            },

            {
              name: "paymentId",
              type: "ID",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "numGuests",
              type: "Integer",
            },

            {
              name: "totalPrice",
              type: "Double",
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
            url: `${basePath}/v1/reservations`,
            title: "Create Reservation",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Update Reservation",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Get Reservation",
            query: [],

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: `${basePath}/v1/reservations/{reservationId}`,
            title: "Delete Reservation",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservations`,
            title: "List Reservations",
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
            url: `${basePath}/v1/reservationguest`,
            title: "Create Reservationguest",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/confirmreservationpayment/{reservationId}`,
            title: "Confirm Reservationpayment",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: `${basePath}/v1/reservationbycode/{reservationId}`,
            title: "Get Reservationbycode",
            query: [],

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/reservationbycode/{reservationId}`,
            title: "Update Reservationbycode",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "reservationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: `${basePath}/v1/cancelreservationbycode/{reservationId}`,
            title: "Cancel Reservationbycode",
            query: [],

            body: {
              type: "json",
              content: {
                guestId: "ID",
                roomId: "ID",
                checkInDate: "Date",
                checkOutDate: "Date",
                packages: "ID",
                specialRequests: "ID",
                paymentId: "ID",
                status: "Enum",
                numGuests: "Integer",
                totalPrice: "Double",
                notes: "Text",
              },
            },

            parameters: [
              {
                key: "reservationId",
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
