const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const baseUrl = process.env.SERVICE_URL ?? "mindbricks.com";
  const shortName = process.env.SERVICE_SHORT_NAME?.toLowerCase();
  const authUrl = shortName ? baseUrl.replace(shortName, "auth") : baseUrl;

  const config = {
    basePath: "bff-api",
    name: "db - bff",
    brand: {
      name: "db",
      image: "https://minioapi.masaupp.com/mindbricks/favico.ico",
      moduleName: "bff",
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
        name: "Dynamic All Index",
        description: "Dynamic All Index for all elasticsearch index",
        reference: {
          tableName: "Dynamic All Index",
          properties: [],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/allIndices",
            title: "All Indices",
            query: [],
            body: {},
            parameters: [],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/list",
            title: "List",
            query: [
              {
                key: "page",
                value: "1",
                description: "Page number",
                active: true,
              },
              {
                key: "limit",
                value: "10",
                description: "Limit number",
                active: true,
              },
              {
                key: "sortBy",
                value: "createdAt",
                description: "Sort by",
                active: true,
              },
              {
                key: "sortOrder",
                value: "desc",
                description: "Sort order",
                active: true,
              },
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "POST",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {
              type: "json",
              content: {
                field: {
                  //operator types: match, eq, noteq, range, exists, missing, prefix, wildcard, regexp, match_phrase, match_phrase_prefix
                  operator: "eq",
                  value: "string",
                  //if operator is range, values: [min, max]
                },
              },
            },
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/count",
            title: "Count",
            query: [
              {
                key: "q",
                value: "",
                description: "Search",
                active: false,
              },
            ],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/schema",
            title: "Schema",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
            ],
            headers: [],
          },
          {
            isAuth: false,
            method: "GET",
            url: "/{indexName}/{id}",
            title: "Get",
            query: [],
            body: {},
            parameters: [
              {
                key: "indexName",
                value: "string",
                description: "Index Name",
              },
              {
                key: "id",
                value: "string",
                description: "Id",
              },
            ],
            headers: [],
          },
        ],
      },
    ],
  };

  config.dataObjects.push({
    name: "AvailableRoomsWithPricesView",
    description: "",
    reference: {
      tableName: "AvailableRoomsWithPricesView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/AvailableRoomsWithPricesView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/AvailableRoomsWithPricesView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "ReservationDetailsView",
    description: "",
    reference: {
      tableName: "ReservationDetailsView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/ReservationDetailsView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ReservationDetailsView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "SpecialRequestDetailsView",
    description: "",
    reference: {
      tableName: "SpecialRequestDetailsView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/SpecialRequestDetailsView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/SpecialRequestDetailsView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "GuestFeedbackView",
    description: "",
    reference: {
      tableName: "GuestFeedbackView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/GuestFeedbackView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/GuestFeedbackView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  config.dataObjects.push({
    name: "ReservationListSummaryView",
    description: "",
    reference: {
      tableName: "ReservationListSummaryView",
      properties: [],
    },
    endpoints: [
      {
        isAuth: false,
        method: "GET",
        url: "/ReservationListSummaryView",
        title: "List",
        query: [],
        body: {},
        parameters: [],
        headers: [],
      },
      {
        isAuth: false,
        method: "GET",
        url: "/ReservationListSummaryView/{id}",
        title: "Get",
        query: [],
        body: {},
        parameters: [
          {
            key: "id",
            value: "string",
            description: "Id",
          },
        ],
        headers: [],
      },
    ],
  });

  inject(app, config);
};
