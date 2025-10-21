# **DB** FRONTEND GUIDE FOR AI CODING AGENTS

This document is a rest api guide for the db project.
The document is designed for AI agents who will generate frontend code that will consume the project backend.

The project has got 1 auth service, 1 notification service, 1 bff service and business services.
Each service is a separate microservice application and listens the HTTP request from different service urls.

The services may be in preview server, staging server or real production server. So each service have got 3 acess urls.
Frontend application should support all deployemnt servers in the development phase,
and user should be able to select the target api server in the login page.

## Project Introduction

db is a backend system for a single hotel, providing complete data management for guests, rooms, reservations, packages, reservation-package mappings, special requests, payments, room prices, customer feedback, and personnel. User authentication and roles are excluded; reservation management relies solely on system-generated reservation codes.

## API Structure

### Object Structure of a Successfull Response

When the service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update API**: These API routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete API**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

  - **Pure Data Forms**: In some cases, the response mirrors the exact structure found in the primary data table, without extensions.
  - **Extended Data Forms**: Alternatively, responses might include data extended through joins with tables within the same service or aggregated from external sources, such as ElasticSearch indices related to other services.
  - **Join Varieties**: The extensions might involve one-to-one joins, resulting in single object associations, or one-to-many joins, leading to an array of objects. In certain instances, the data might even feature nested inclusions from other data objects.

**Design Considerations**: The structure of a API's response data is meticulously crafted during the service's architectural planning. This design ensures that responses adequately reflect the intended data relationships and service logic, providing clients with rich and meaningful information.

**Brief Data**: Certain API's return a condensed version of the object data, intentionally selecting only specific fields deemed useful for that request. In such instances, the API documentation will detail the properties included in the response, guiding developers on what to expect.

### API Response Structure

The API utilizes a standardized JSON envelope to encapsulate responses. This envelope is designed to consistently deliver both the requested data and essential metadata, ensuring that clients can efficiently interpret and utilize the response.

**HTTP Status Codes:**

- **200 OK**: This status code is returned for successful GET, LIST, UPDATE, or DELETE operations, indicating that the request has been processed successfully.
- **201 Created**: This status code is specific to CREATE operations, signifying that the requested resource has been successfully created.

**Success Response Format:**

For successful operations, the response includes a `"status": "OK"` property, signaling the successful execution of the request. The structure of a successful response is outlined below:

```json
{
  "status": "OK",
  "statusCode": 200,
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "products",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": 3,
  "products": [{}, {}, {}],
  "paging": {
    "pageNumber": 1,
    "pageRowCount": 25,
    "totalRowCount": 3,
    "pageCount": 1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

### Additional Data

Each api öay have include addtional data other than the main data object according to the business logic of the API. They will be given in each API's response signature.

### Error Response

If a request encounters an issue, whether due to a logical fault or a technical problem, the service responds with a standardized JSON error structure. The HTTP status code within this response indicates the nature of the error, utilizing commonly recognized codes for clarity:

- **400 Bad Request**: The request was improperly formatted or contained invalid parameters, preventing the server from processing it.
- **401 Unauthorized**: The request lacked valid authentication credentials or the credentials provided do not grant access to the requested resource.
- **404 Not Found**: The requested resource was not found on the server.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Each error response is structured to provide meaningful insight into the problem, assisting in diagnosing and resolving issues efficiently.

```js
{
  "result": "ERR",
  "status": 400,
  "message": "errMsg_organizationIdisNotAValidID",
  "errCode": 400,
  "date": "2024-03-19T12:13:54.124Z",
  "detail": "String"
}
```

Here’s a **refined and restructured version** of your document — with a clean hierarchy, consistent heading levels, and standardized formatting for professional API documentation.
All repeated behavioral sections were grouped under unified “Behavioral Notes” subsections to reduce redundancy.

## Registration Management

First of all please ensure that register and login pages do have a deployemnt server selection option, so as the frontned coding agent you can arrange the base url path of all services.

Start with a landing page and arranging register, verification and login flow. So at the first step, you need a general knowledge of the application to make a good landing page and the authetication flow.

### How To Register

Using `registeruser` route of auth api, send the required fields to the backend in your registration page.

The registerUser api is described with request and response structure below.

After a successful registration, frontend code should handle the verification needs. The registration response will have a `user` object in the root envelope, this object will have user information with an `id` parameter.

## Bucket Management

This application has a bucket service and is used to store user or other objects related files. Bucket service is login agnostic, so when accessing for write or private read, you should insert a bucket token (given by services) to your request authorization header as bearer token.

**User Bucket**
This bucket is used to store public user files for each user.

When a user logs in, or in /currentuser response there is `userBucketToken` to be used when sending user related public files to the bucket service.

To upload

`POST {baseUrl}/bucket/upload`

Request body is form data which includes the bucketId and the file as binary in `files` property.

```js
{
    bucketId: "{userId}-public-user-bucket",
    files: {binary}
}
```

Response status is 200 on succesfull result, eg body:

```json
{
  "success": true,
  "data": [
    {
      "fileId": "9da03f6d-0409-41ad-bb06-225a244ae408",
      "originalName": "test (10).png",
      "mimeType": "image/png",
      "size": 604063,
      "status": "uploaded",
      "bucketName": "f7103b85-fcda-4dec-92c6-c336f71fd3a2-public-user-bucket",
      "isPublic": true,
      "downloadUrl": "https://babilcom.mindbricks.co/bucket/download/9da03f6d-0409-41ad-bb06-225a244ae408"
    }
  ]
}
```

To download a file from the bucket, you should know its fileId, so if youupload an avatar or something else, be sure that the download url or the fileId is stored in backend.

Bucket is mostly used, in object creations where alos demands an addtional file like a product image or user avatar. So after you upload your image to the bucket, insert the returned download url to the related property in the related object creation.

**Application Bucket**

This Db application alos has common public bucket which everybody has a read access, but only users who have `superAdmin`, `admin` or `saasAdmin` roles can write (upload) to the bucket.

The common public project bucket id is

`"db-public-common-bucket"`

and in certain areas like product image uploads, since the user will already have the admin bucket token, he will be able to upload realted object images.

Please make your UI arrangements as able to upload files to the bucket using these bucket tokens.

**Object Buckets**
Some objects may return also a bucket token, to upload or access related files with object. For example, when you get a project's data in a project management application, if there is a public or private bucket token, this is provided mostly for uploading project related files or downloading them with the token.

These buckets will be used according to the descriptions given along with the object definitions.

## 1. Authentication Routes

### 1.1 `POST /login` — User Login

**Purpose:**
Verifies user credentials and creates an authenticated session with a JWT access token.

**Access Routes:**

- `GET /login`: Returns a minimal HTML login page (for browser-based testing).
- `POST /login`: Authenticates user credentials and returns an access token and session.

#### Request Parameters

| Parameter  | Type   | Required | Source                  |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | `request.body.username` |
| `password` | String | Yes      | `request.body.password` |

#### Behavior

- Authenticates credentials and returns a session object.
- Sets cookie: `projectname-access-token[-tenantCodename]`
- Adds the same token in response headers.
- Accepts either `username` or `email` fields (if both exist, `username` is prioritized).

#### Example

```js
axios.post("/login", {
  username: "user@example.com",
  password: "securePassword",
});
```

#### Success Response

```json
{
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe"
  //...
}
```

#### Error Responses

- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Email/mobile verification or 2FA pending
- `400 Bad Request`: Missing parameters

---

### 1.2 `POST /logout` — User Logout

**Purpose:**
Terminates the current session and clears associated authentication tokens.

#### Behavior

- Invalidates session (if exists).
- Clears cookie `projectname-access-token[-tenantCodename]`.
- Returns a confirmation response (always `200 OK`).

#### Example

```js
axios.post(
  "/logout",
  {},
  {
    headers: { Authorization: "Bearer your-jwt-token" },
  },
);
```

#### Notes

- Can be called without a session (idempotent behavior).
- Works for both cookie-based and token-based sessions.

#### Success Response

```json
{ "status": "OK", "message": "User logged out successfully" }
```

---

## 2. Verification Services Overview

All verification routes are grouped under the `/verification-services` base path.
They follow a **two-step verification pattern**: `start` → `complete`.

---

## 3. Email Verification

### 3.1 Trigger Scenarios

- After registration (`emailVerificationRequiredForLogin` = true)
- When updating email address
- When login fails due to unverified email

### 3.2 Flow Summary

1. `/start` → Generate & send code via email.
2. `/complete` → Verify code and mark email as verified.

** PLEASE NOTE **

Email verification is a frontend triiggered process. After user registers, the frontend should start the email verification process and navigate to its code input page.

---

### 3.3 `POST /verification-services/email-verification/start`

**Purpose:**
Starts the email verification by generating and sending a secret code.

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `email`   | String | Yes      | User’s email address to verify |

**Example Request**

```json
{ "email": "user@example.com" }
```

**Success Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

> ⚠️ In production, `secretCode` is **not** returned — only sent via email.

**Error Responses**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Too many attempts (rate limit)

---

### 3.4 `POST /verification-services/email-verification/complete`

**Purpose:**
Completes the verification using the received code.

| Parameter    | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| `email`      | String | Yes      | User’s email      |
| `secretCode` | String | Yes      | Verification code |

**Success Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "email": "user@email.com",
  // in testMode
  "userId": "user-uuid"
}
```

**Error Responses**

- `403 Forbidden`: Code expired or mismatched
- `404 Not Found`: No verification in progress

---

### 3.5 Behavioral Notes

- **Resend Cooldown:** `resendTimeWindow` (e.g. 60s)
- **Expiration:** Codes expire after `expireTimeWindow` (e.g. 1 day)
- **Single Active Session:** One verification per user

---

## 4. Mobile Verification

### 4.1 Trigger Scenarios

- After registration (`mobileVerificationRequiredForLogin` = true)
- When updating phone number
- On login requiring mobile verification

### 4.2 Flow

1. `/start` → Sends verification code via SMS
2. `/complete` → Validates code and confirms number

---

### 4.3 `POST /verification-services/mobile-verification/start`

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `email`   | String | Yes      | User’s email to locate mobile record |

**Success Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 180,
  "verificationType": "byCode",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

> ⚠️ `secretCode` returned only in development.

**Errors**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Rate-limited

---

### 4.4 `POST /verification-services/mobile-verification/complete`

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `email`      | String | Yes      | Associated email      |
| `secretCode` | String | Yes      | Code received via SMS |

**Success Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "mobile": "+1 333 ...",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 4.5 Behavioral Notes

- **Cooldown:** One code per minute
- **Expiration:** Codes valid for 1 day
- **One Session Per User**

---

## 5. Two-Factor Authentication (2FA)

### 5.1 Email 2FA

**Flow**

1. `/start` → Generates and sends email code
2. `/complete` → Verifies code and updates session

---

#### `POST /verification-services/email-2factor-verification/start`

| Parameter   | Type   | Required | Description      |
| ----------- | ------ | -------- | ---------------- |
| `userId`    | String | Yes      | User ID          |
| `sessionId` | String | Yes      | Current session  |
| `client`    | String | No       | Optional context |
| `reason`    | String | No       | Reason for 2FA   |

**Response**

```json
{
  "status": "OK",
  "sessionId": "user session id UUID",
  "userId": "user-uuid",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456"
}
```

---

#### `POST /verification-services/email-2factor-verification/complete`

| Parameter    | Type   | Required | Description     |
| ------------ | ------ | -------- | --------------- |
| `userId`     | String | Yes      | User ID         |
| `sessionId`  | String | Yes      | Session ID      |
| `secretCode` | String | Yes      | Code from email |

**Response**

```json
{
  // user session data
  "sessionId": "session-uuid"
  // ...
}
```

---

### 5.2 Mobile 2FA

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and finalizes session

---

#### `POST /verification-services/mobile-2factor-verification/start`

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| `userId`    | String | Yes      | User ID     |
| `sessionId` | String | Yes      | Session ID  |
| `client`    | String | No       | Context     |
| `reason`    | String | No       | Reason      |

**Response**

```json
{
  "status": "OK",
  "sessionId": "user session id UUID",
  "userId": "user-uuid",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456"
}
```

---

#### `POST /verification-services/mobile-2factor-verification/complete`

| Parameter    | Type   | Required | Description  |
| ------------ | ------ | -------- | ------------ |
| `userId`     | String | Yes      | User ID      |
| `sessionId`  | String | Yes      | Session ID   |
| `secretCode` | String | Yes      | Code via SMS |

**Response**

```json
{
  // user session data
  "sessionId": "session-uuid"
  // ...
}
```

---

### 5.3 2FA Behavioral Notes

- One active code per session
- Cooldown: `resendTimeWindow` (e.g., 60s)
- Expiration: `expireTimeWindow` (e.g., 5m)

---

## 6. Password Reset

### 6.1 By Email

**Flow**

1. `/start` → Sends verification code via email
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-email/start`

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `email`   | String | Yes      | User email  |

**Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

#### `POST /verification-services/password-reset-by-email/complete`

| Parameter    | Type   | Required | Description   |
| ------------ | ------ | -------- | ------------- |
| `email`      | String | Yes      | User email    |
| `secretCode` | String | Yes      | Code received |
| `password`   | String | Yes      | New password  |

**Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "email": "user@email.com",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 6.2 By Mobile

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-mobile/start`

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `mobile`  | String | Yes      | Mobile number |

**Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

#### `POST /verification-services/password-reset-by-mobile/complete`

| Parameter    | Type   | Required | Description      |
| ------------ | ------ | -------- | ---------------- |
| `email`      | String | Yes      | Associated email |
| `secretCode` | String | Yes      | Code via SMS     |
| `password`   | String | Yes      | New password     |

**Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "mobile": "+1 444 ....",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 6.3 Behavioral Notes

- Cooldown: 60s resend
- Expiration: 24h
- One session per user
- Works without an active login session

---

## 7. Verification Method Types

### 7.1 `byCode`

User manually enters the 6-digit code in frontend.

### 7.2 `byLink`

Frontend handles a one-click verification via email/SMS link containing code parameters.

## 8) `GET /currentuser` — Current Session

**Purpose**
Return the currently authenticated user’s session.

**Route Type**
`sessionInfo`

**Authentication**
Requires a valid access token (header or cookie).

### Request

_No parameters._

### Example

```js
axios.get("/currentuser", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Returns the session object (identity, tenancy, token metadata):

```json
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  "...": "..."
}
```

### Errors

- **401 Unauthorized** — No active session/token

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

**Notes**

- Commonly called by web/mobile clients after login to hydrate session state.
- Includes key identity/tenant fields and a token reference (if applicable).
- Ensure a valid token is supplied to receive a 200 response.

---

## 9) `GET /permissions` — List Effective Permissions

**Purpose**
Return all effective permission grants for the current user.

**Route Type**
`permissionFetch`

**Authentication**
Requires a valid access token.

### Request

_No parameters._

### Example

```js
axios.get("/permissions", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Array of permission grants (aligned with `givenPermissions`):

```json
[
  {
    "id": "perm1",
    "permissionName": "adminPanel.access",
    "roleId": "admin",
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  },
  {
    "id": "perm2",
    "permissionName": "orders.manage",
    "roleId": null,
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  }
]
```

**Field meanings (per item):**

- `permissionName`: Granted permission key.
- `roleId`: Present if granted via role.
- `subjectUserId`: Present if granted directly to the user.
- `subjectUserGroupId`: Present if granted via group.
- `objectId`: Present if scoped to a specific object (OBAC).
- `canDo`: `true` if enabled, `false` if restricted.

### Errors

- **401 Unauthorized** — No active session

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

- **500 Internal Server Error** — Unexpected failure

**Notes**

- Available on all Mindbricks-generated services (not only Auth).
- **Auth service:** Reads live `givenPermissions` from DB.
- **Other services:** Typically respond from a cached/projected view (e.g., ElasticSearch) for faster checks.

> **Tip:** Cache permission results client-side/server-side and refresh after login or permission updates.

---

## 10) `GET /permissions/:permissionName` — Check Permission Scope

**Purpose**
Check whether the current user has a specific permission and return any scoped object exceptions/inclusions.

**Route Type**
`permissionScopeCheck`

**Authentication**
Requires a valid access token.

### Path Parameters

| Name             | Type   | Required | Source                          |
| ---------------- | ------ | -------- | ------------------------------- |
| `permissionName` | String | Yes      | `request.params.permissionName` |

### Example

```js
axios.get("/permissions/orders.manage", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

**Interpretation**

- If `canDo: true`: permission is generally granted **except** the listed `exceptions` (restrictions).
- If `canDo: false`: permission is generally **not** granted, **only** allowed for the listed `exceptions` (selective overrides).
- `exceptions` contains object IDs (UUID strings) from the relevant domain model.

### Errors

- **401 Unauthorized** — No active session/token.

## Services And Data Object

## Auth Service

Authentication service for the project

### Auth Service Data Objects

**User**
A data object that stores the user information and handles login settings.

### Auth Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/auth-api`
- **Staging:** `https://db-stage.mindbricks.co/auth-api`
- **Production:** `https://db.mindbricks.co/auth-api`

#### `Get User` API

This api is used by admin roles or the users themselves to get the user profile information.

The `getUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `getUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users/:userId**

```js
axios({
  method: "GET",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update User` API

This route is used by users to update their profiles.

The `updateUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `updateUser` api has got 3 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| fullname  | String | false    | request.body?.fullname |
| avatar    | String | false    | request.body?.avatar   |

**userId** : This id paremeter is used to select the required data object that will be updated
**fullname** : A string value to represent the fullname of the user
**avatar** : The avatar url of the user. A random avatar will be generated if not provided

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/users/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/users/${userId}`,
  data: {
    fullname: "String",
    avatar: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Register User` API

This api is used by public users to register themselves

The `registerUser` API REST controller can be triggered via the following route:

`/v1/registeruser`

**Rest Request Parameters**

The `registerUser` api has got 4 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| avatar    | String | false    | request.body?.avatar   |
| password  | String | true     | request.body?.password |
| fullname  | String | true     | request.body?.fullname |
| email     | String | true     | request.body?.email    |

**avatar** : The avatar url of the user. If not sent, a default random one will be generated.
**password** : The password defined by the the user that is being registered.
**fullname** : The fullname defined by the the user that is being registered.
**email** : The email defined by the the user that is being registered.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/registeruser**

```js
axios({
  method: "POST",
  url: "/v1/registeruser",
  data: {
    avatar: "String",
    password: "String",
    fullname: "String",
    email: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete User` API

This api is used by users to delete their profiles.

The `deleteUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `deleteUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/users/:userId**

```js
axios({
  method: "DELETE",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Users` API

The `listUsers` API REST controller can be triggered via the following route:

`/v1/users`

**Rest Request Parameters**
The `listUsers` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users**

```js
axios({
  method: "GET",
  url: "/v1/users",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "users",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "users": [
    {
      "id": "ID",
      "_owner": "ID",
      "email": "String",
      "password": "String",
      "fullname": "String",
      "avatar": "String",
      "roleId": "String",
      "emailVerified": "Boolean",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

#### `Update Userrole` API

This route is used by admin roles to update the user role.The default role is user when a user is registered. A user's role can be updated by superAdmin or admin

The `updateUserRole` API REST controller can be triggered via the following route:

`/v1/userrole/:userId`

**Rest Request Parameters**

The `updateUserRole` api has got 2 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| roleId    | String | true     | request.body?.roleId   |

**userId** : This id paremeter is used to select the required data object that will be updated
**roleId** : The new roleId of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userrole/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userrole/${userId}`,
  data: {
    roleId: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Userpassword` API

This route is used to to force the password update by old password.

The `updateUserPassword` API REST controller can be triggered via the following route:

`/v1/userpassword/:userId`

**Rest Request Parameters**

The `updateUserPassword` api has got 3 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| userId      | ID     | true     | request.params?.userId    |
| oldPassword | String | true     | request.body?.oldPassword |
| newPassword | String | true     | request.body?.newPassword |

**userId** : This id paremeter is used to select the required data object that will be updated
**oldPassword** : The old password of the user that will be overridden bu the new one. Send for double check.
**newPassword** : The new password of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userpassword/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userpassword/${userId}`,
  data: {
    oldPassword: "String",
    newPassword: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Briefuser` API

This route is used by public to get simple user profile information.

The `getBriefUser` API REST controller can be triggered via the following route:

`/v1/briefuser/:userId`

**Rest Request Parameters**

The `getBriefUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/briefuser/:userId**

```js
axios({
  method: "GET",
  url: `/v1/briefuser/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

This route's response is constrained to a select list of properties, and therefore does not encompass all attributes of the resource.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "avatar": "String",
    "isActive": true
  }
}
```

## GuestManagement Service

Manages guest profiles and operational data for the single hotel. Supports full staff CRUD on guest records for operations and compliance.

### GuestManagement Service Data Objects

**Guest**
Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.

### GuestManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/guestmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/guestmanagement-api`
- **Production:** `https://db.mindbricks.co/guestmanagement-api`

#### `Create Guest` API

Creates a new guest record for hotel operations.

The `createGuest` API REST controller can be triggered via the following route:

`/v1/guests`

**Rest Request Parameters**

The `createGuest` api has got 5 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| fullname    | String | true     | request.body?.fullname    |
| email       | String | false    | request.body?.email       |
| phoneNumber | String | false    | request.body?.phoneNumber |
| address     | Text   | false    | request.body?.address     |
| notes       | Text   | false    | request.body?.notes       |

**fullname** : Full name of the guest.
**email** : Guest's email address for contact or info purposes.
**phoneNumber** : Guest's phone number, used for record or contact as needed.
**address** : Full postal address of the guest.
**notes** : Internal staff comments for the guest record (not exposed to guests).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/guests**

```js
axios({
  method: "POST",
  url: "/v1/guests",
  data: {
    fullname: "String",
    email: "String",
    phoneNumber: "String",
    address: "Text",
    notes: "Text",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "guest",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "guest": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "email": "String",
    "phoneNumber": "String",
    "address": "Text",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Guest` API

Updates existing guest record details.

The `updateGuest` API REST controller can be triggered via the following route:

`/v1/guests/:guestId`

**Rest Request Parameters**

The `updateGuest` api has got 6 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| guestId     | ID     | true     | request.params?.guestId   |
| fullname    | String | false    | request.body?.fullname    |
| email       | String | false    | request.body?.email       |
| phoneNumber | String | false    | request.body?.phoneNumber |
| address     | Text   | false    | request.body?.address     |
| notes       | Text   | false    | request.body?.notes       |

**guestId** : This id paremeter is used to select the required data object that will be updated
**fullname** : Full name of the guest.
**email** : Guest's email address for contact or info purposes.
**phoneNumber** : Guest's phone number, used for record or contact as needed.
**address** : Full postal address of the guest.
**notes** : Internal staff comments for the guest record (not exposed to guests).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/guests/:guestId**

```js
axios({
  method: "PATCH",
  url: `/v1/guests/${guestId}`,
  data: {
    fullname: "String",
    email: "String",
    phoneNumber: "String",
    address: "Text",
    notes: "Text",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "guest",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "guest": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "email": "String",
    "phoneNumber": "String",
    "address": "Text",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Guest` API

Retrieves a guest record by ID for staff operations.

The `getGuest` API REST controller can be triggered via the following route:

`/v1/guests/:guestId`

**Rest Request Parameters**

The `getGuest` api has got 1 request parameter

| Parameter | Type | Required | Population              |
| --------- | ---- | -------- | ----------------------- |
| guestId   | ID   | true     | request.params?.guestId |

**guestId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/guests/:guestId**

```js
axios({
  method: "GET",
  url: `/v1/guests/${guestId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "guest",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "guest": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "email": "String",
    "phoneNumber": "String",
    "address": "Text",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Guest` API

Deletes a guest record (soft delete if enabled).

The `deleteGuest` API REST controller can be triggered via the following route:

`/v1/guests/:guestId`

**Rest Request Parameters**

The `deleteGuest` api has got 1 request parameter

| Parameter | Type | Required | Population              |
| --------- | ---- | -------- | ----------------------- |
| guestId   | ID   | true     | request.params?.guestId |

**guestId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/guests/:guestId**

```js
axios({
  method: "DELETE",
  url: `/v1/guests/${guestId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "guest",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "guest": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "email": "String",
    "phoneNumber": "String",
    "address": "Text",
    "notes": "Text",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Guests` API

Lists guest records for hotel staff, with filtering on basic fields.

The `listGuests` API REST controller can be triggered via the following route:

`/v1/guests`

**Rest Request Parameters**
The `listGuests` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/guests**

```js
axios({
  method: "GET",
  url: "/v1/guests",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "guests",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "guests": [
    {
      "id": "ID",
      "_owner": "ID",
      "fullname": "String",
      "email": "String",
      "phoneNumber": "String",
      "address": "Text",
      "notes": "Text",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## RoomInventory Service

Maintains the room inventory of the single hotel, supporting CRUD for staff and public room search for guest reservation workflow.

### RoomInventory Service Data Objects

**Room**
Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.

### RoomInventory Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/roominventory-api`
- **Staging:** `https://db-stage.mindbricks.co/roominventory-api`
- **Production:** `https://db.mindbricks.co/roominventory-api`

#### `Update Room` API

Updates details of a room. Only intended for staff interface.

The `updateRoom` API REST controller can be triggered via the following route:

`/v1/rooms/:roomId`

**Rest Request Parameters**

The `updateRoom` api has got 10 request parameters

| Parameter   | Type    | Required | Population                |
| ----------- | ------- | -------- | ------------------------- |
| roomId      | ID      | true     | request.params?.roomId    |
| roomNumber  | String  | false    | request.body?.roomNumber  |
| floor       | Integer | false    | request.body?.floor       |
| type        | Enum    | false    | request.body?.type        |
| capacity    | Integer | false    | request.body?.capacity    |
| bedType     | String  | false    | request.body?.bedType     |
| amenities   | String  | false    | request.body?.amenities   |
| status      | Enum    | false    | request.body?.status      |
| description | Text    | false    | request.body?.description |
| images      | String  | false    | request.body?.images      |

**roomId** : This id paremeter is used to select the required data object that will be updated
**roomNumber** : Unique number or code for the room (e.g., 101, B12).
**floor** : Floor number where room is located.
**type** : Room type (e.g., single, double, suite).
**capacity** : Maximum number of guests room can accommodate.
**bedType** : Type of beds (e.g., queen, twin, king).
**amenities** : Array of amenity descriptions (e.g., Wi-Fi, TV, minibar).
**status** : Room status (available, occupied, under maintenance).
**description** : Detailed textual description of the room.
**images** : Image URLs for the room.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/rooms/:roomId**

```js
axios({
  method: "PATCH",
  url: `/v1/rooms/${roomId}`,
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "room",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "room": {
    "id": "ID",
    "_owner": "ID",
    "roomNumber": "String",
    "floor": "Integer",
    "type": "Enum",
    "type_": "String",
    "capacity": "Integer",
    "bedType": "String",
    "amenities": "String",
    "status": "Enum",
    "status_": "String",
    "description": "Text",
    "images": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Room` API

Retrieve a room by ID. Staff only; not exposed to guests directly.

The `getRoom` API REST controller can be triggered via the following route:

`/v1/rooms/:roomId`

**Rest Request Parameters**

The `getRoom` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| roomId    | ID   | true     | request.params?.roomId |

**roomId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/rooms/:roomId**

```js
axios({
  method: "GET",
  url: `/v1/rooms/${roomId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "room",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "room": {
    "id": "ID",
    "_owner": "ID",
    "roomNumber": "String",
    "floor": "Integer",
    "type": "Enum",
    "type_": "String",
    "capacity": "Integer",
    "bedType": "String",
    "amenities": "String",
    "status": "Enum",
    "status_": "String",
    "description": "Text",
    "images": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Room` API

Deletes a room from the inventory (soft delete). Staff only.

The `deleteRoom` API REST controller can be triggered via the following route:

`/v1/rooms/:roomId`

**Rest Request Parameters**

The `deleteRoom` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| roomId    | ID   | true     | request.params?.roomId |

**roomId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/rooms/:roomId**

```js
axios({
  method: "DELETE",
  url: `/v1/rooms/${roomId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "room",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "room": {
    "id": "ID",
    "_owner": "ID",
    "roomNumber": "String",
    "floor": "Integer",
    "type": "Enum",
    "type_": "String",
    "capacity": "Integer",
    "bedType": "String",
    "amenities": "String",
    "status": "Enum",
    "status_": "String",
    "description": "Text",
    "images": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Rooms` API

Lists all rooms with optional filters (public and staff).

The `listRooms` API REST controller can be triggered via the following route:

`/v1/rooms`

**Rest Request Parameters**
The `listRooms` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/rooms**

```js
axios({
  method: "GET",
  url: "/v1/rooms",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "rooms",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "rooms": [
    {
      "id": "ID",
      "_owner": "ID",
      "roomNumber": "String",
      "floor": "Integer",
      "type": "Enum",
      "type_": "String",
      "capacity": "Integer",
      "bedType": "String",
      "amenities": "String",
      "status": "Enum",
      "status_": "String",
      "description": "Text",
      "images": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

#### `List Availablerooms` API

Lists available rooms for booking. Public API for reservation selection; allows filtering by type, capacity, floor, and more. Only rooms with 'available' status are returned.

The `listAvailableRooms` API REST controller can be triggered via the following route:

`/v1/availablerooms`

**Rest Request Parameters**
The `listAvailableRooms` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/availablerooms**

```js
axios({
  method: "GET",
  url: "/v1/availablerooms",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "rooms",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "rooms": [
    {
      "id": "ID",
      "_owner": "ID",
      "roomNumber": "String",
      "floor": "Integer",
      "type": "Enum",
      "type_": "String",
      "capacity": "Integer",
      "bedType": "String",
      "amenities": "String",
      "status": "Enum",
      "status_": "String",
      "description": "Text",
      "images": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## ReservationManagement Service

Handles hotel reservation workflow for guests and staff, using secure reservation codes for guest self-service and cross-referencing guest, room, payment, package, and special request data.

### ReservationManagement Service Data Objects

**Reservation**
Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.

### ReservationManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/reservationmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/reservationmanagement-api`
- **Production:** `https://db.mindbricks.co/reservationmanagement-api`

#### `Create Reservation` API

Staff API to create new reservation record with any status. Internal use only.

The `createReservation` API REST controller can be triggered via the following route:

`/v1/reservations`

**Rest Request Parameters**

The `createReservation` api has got 11 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/reservations**

```js
axios({
  method: "POST",
  url: "/v1/reservations",
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Reservation` API

Staff API to update any reservation field. Internal use only.

The `updateReservation` API REST controller can be triggered via the following route:

`/v1/reservations/:reservationId`

**Rest Request Parameters**

The `updateReservation` api has got 12 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| reservationId   | ID      | true     | request.params?.reservationId |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**reservationId** : This id paremeter is used to select the required data object that will be updated
**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/reservations/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/reservations/${reservationId}`,
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Reservation` API

Staff API to get reservation by ID. Internal use only.

The `getReservation` API REST controller can be triggered via the following route:

`/v1/reservations/:reservationId`

**Rest Request Parameters**

The `getReservation` api has got 1 request parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

**reservationId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/reservations/:reservationId**

```js
axios({
  method: "GET",
  url: `/v1/reservations/${reservationId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Reservation` API

Staff API to delete reservation by ID (soft-delete enabled). Internal use only.

The `deleteReservation` API REST controller can be triggered via the following route:

`/v1/reservations/:reservationId`

**Rest Request Parameters**

The `deleteReservation` api has got 1 request parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

**reservationId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/reservations/:reservationId**

```js
axios({
  method: "DELETE",
  url: `/v1/reservations/${reservationId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Reservations` API

Staff API to list reservations for hotel operations. Internal use only.

The `listReservations` API REST controller can be triggered via the following route:

`/v1/reservations`

**Rest Request Parameters**
The `listReservations` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/reservations**

```js
axios({
  method: "GET",
  url: "/v1/reservations",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservations",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "reservations": [
    {
      "id": "ID",
      "_owner": "ID",
      "guestId": "ID",
      "roomId": "ID",
      "checkInDate": "Date",
      "checkOutDate": "Date",
      "reservationCode": "String",
      "packages": "ID",
      "specialRequests": "ID",
      "paymentId": "ID",
      "status": "Enum",
      "status_": "String",
      "numGuests": "Integer",
      "totalPrice": "Double",
      "notes": "Text",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

#### `Create Reservationguest` API

Guest-facing API. Create a reservation in 'pending' status (pre-payment, no code yet), with guest, dates, room, packages, and optional special requests.

The `createReservationGuest` API REST controller can be triggered via the following route:

`/v1/reservationguest`

**Rest Request Parameters**

The `createReservationGuest` api has got 11 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/reservationguest**

```js
axios({
  method: "POST",
  url: "/v1/reservationguest",
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Confirm Reservationpayment` API

Guest API. After external payment is successful, mark reservation as confirmed, generate & store reservationCode.

The `confirmReservationPayment` API REST controller can be triggered via the following route:

`/v1/confirmreservationpayment/:reservationId`

**Rest Request Parameters**

The `confirmReservationPayment` api has got 12 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| reservationId   | ID      | true     | request.params?.reservationId |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**reservationId** : This id paremeter is used to select the required data object that will be updated
**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/confirmreservationpayment/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/confirmreservationpayment/${reservationId}`,
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Reservationbycode` API

Guest self-service. Retrieve reservation by reservationCode (no auth).

The `getReservationByCode` API REST controller can be triggered via the following route:

`/v1/reservationbycode/:reservationId`

**Rest Request Parameters**

The `getReservationByCode` api has got 1 request parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

**reservationId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/reservationbycode/:reservationId**

```js
axios({
  method: "GET",
  url: `/v1/reservationbycode/${reservationId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Reservationbycode` API

Guest self-service. Update reservation by reservationCode. Only if status allows; restrict to editable fields for guest.

The `updateReservationByCode` API REST controller can be triggered via the following route:

`/v1/reservationbycode/:reservationId`

**Rest Request Parameters**

The `updateReservationByCode` api has got 12 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| reservationId   | ID      | true     | request.params?.reservationId |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**reservationId** : This id paremeter is used to select the required data object that will be updated
**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/reservationbycode/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/reservationbycode/${reservationId}`,
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Cancel Reservationbycode` API

Guest self-service. Cancel reservation using reservationCode. Only possible if not already canceled or completed.

The `cancelReservationByCode` API REST controller can be triggered via the following route:

`/v1/cancelreservationbycode/:reservationId`

**Rest Request Parameters**

The `cancelReservationByCode` api has got 12 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| reservationId   | ID      | true     | request.params?.reservationId |
| guestId         | ID      | true     | request.body?.guestId         |
| roomId          | ID      | true     | request.body?.roomId          |
| checkInDate     | Date    | true     | request.body?.checkInDate     |
| checkOutDate    | Date    | true     | request.body?.checkOutDate    |
| packages        | ID      | false    | request.body?.packages        |
| specialRequests | ID      | false    | request.body?.specialRequests |
| paymentId       | ID      | false    | request.body?.paymentId       |
| status          | Enum    | true     | request.body?.status          |
| numGuests       | Integer | true     | request.body?.numGuests       |
| totalPrice      | Double  | true     | request.body?.totalPrice      |
| notes           | Text    | false    | request.body?.notes           |

**reservationId** : This id paremeter is used to select the required data object that will be updated
**guestId** : Reference to guest who made this reservation.
**roomId** : Reference to the hotel room for this reservation.
**checkInDate** : Check-in date for the reservation.
**checkOutDate** : Check-out date for the reservation.
**packages** : Array of package IDs associated to this reservation (maps to packageReservationMapping).
**specialRequests** : Array of specialRequest IDs associated with this reservation.
**paymentId** : Reference to the payment record for this reservation.
**status** : Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
**numGuests** : Number of guests for this reservation.
**totalPrice** : Total price for the reservation (rooms + packages).
**notes** : Internal notes, only for staff eyes (not sent to guests/public).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/cancelreservationbycode/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/cancelreservationbycode/${reservationId}`,
  data: {
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
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "guestId": "ID",
    "roomId": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "reservationCode": "String",
    "packages": "ID",
    "specialRequests": "ID",
    "paymentId": "ID",
    "status": "Enum",
    "status_": "String",
    "numGuests": "Integer",
    "totalPrice": "Double",
    "notes": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## PackageManagement Service

Maintains the catalog of packages and extras available for reservations (e.g., breakfast included, spa access). Staff CRUD only.

### PackageManagement Service Data Objects

**Package\_**
Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.

### PackageManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/packagemanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/packagemanagement-api`
- **Production:** `https://db.mindbricks.co/packagemanagement-api`

#### `Create Package_` API

Creates a new package/extra that can be offered to hotel guests. Staff usage.

The `createPackage` API REST controller can be triggered via the following route:

`/v1/package_s`

**Rest Request Parameters**

The `createPackage` api has got 5 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| name        | String | true     | request.body?.name        |
| description | String | true     | request.body?.description |
| price       | Double | true     | request.body?.price       |
| duration    | String | false    | request.body?.duration    |
| conditions  | String | false    | request.body?.conditions  |

**name** : Name of the package or extra service.
**description** : Detailed description of the package/extra service.
**price** : Price for the package/extra, in hotel currency.
**duration** : (Optional) How long the package/extra is valid (e.g., per day, per stay, etc.).
**conditions** : (Optional) Any conditions or rules attached to the package (e.g., must book 2 nights).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/package_s**

```js
axios({
  method: "POST",
  url: "/v1/package_s",
  data: {
    name: "String",
    description: "String",
    price: "Double",
    duration: "String",
    conditions: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "package_",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "package_": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "String",
    "price": "Double",
    "duration": "String",
    "conditions": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Package_` API

Updates an existing package/extra. Staff usage.

The `updatePackage` API REST controller can be triggered via the following route:

`/v1/package_s/:package_Id`

**Rest Request Parameters**

The `updatePackage` api has got 6 request parameters

| Parameter   | Type   | Required | Population                 |
| ----------- | ------ | -------- | -------------------------- |
| package_Id  | ID     | true     | request.params?.package_Id |
| name        | String | false    | request.body?.name         |
| description | String | false    | request.body?.description  |
| price       | Double | false    | request.body?.price        |
| duration    | String | false    | request.body?.duration     |
| conditions  | String | false    | request.body?.conditions   |

**package_Id** : This id paremeter is used to select the required data object that will be updated
**name** : Name of the package or extra service.
**description** : Detailed description of the package/extra service.
**price** : Price for the package/extra, in hotel currency.
**duration** : (Optional) How long the package/extra is valid (e.g., per day, per stay, etc.).
**conditions** : (Optional) Any conditions or rules attached to the package (e.g., must book 2 nights).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/package_s/:package_Id**

```js
axios({
  method: "PATCH",
  url: `/v1/package_s/${package_Id}`,
  data: {
    name: "String",
    description: "String",
    price: "Double",
    duration: "String",
    conditions: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "package_",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "package_": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "String",
    "price": "Double",
    "duration": "String",
    "conditions": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Package_` API

Retrieves a package or extra by ID. Staff usage.

The `getPackage` API REST controller can be triggered via the following route:

`/v1/package_s/:package_Id`

**Rest Request Parameters**

The `getPackage` api has got 1 request parameter

| Parameter  | Type | Required | Population                 |
| ---------- | ---- | -------- | -------------------------- |
| package_Id | ID   | true     | request.params?.package_Id |

**package_Id** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/package_s/:package_Id**

```js
axios({
  method: "GET",
  url: `/v1/package_s/${package_Id}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "package_",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "package_": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "String",
    "price": "Double",
    "duration": "String",
    "conditions": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Package_` API

Deletes the specified package/extra (soft delete if enabled). Staff usage.

The `deletePackage` API REST controller can be triggered via the following route:

`/v1/package_s/:package_Id`

**Rest Request Parameters**

The `deletePackage` api has got 1 request parameter

| Parameter  | Type | Required | Population                 |
| ---------- | ---- | -------- | -------------------------- |
| package_Id | ID   | true     | request.params?.package_Id |

**package_Id** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/package_s/:package_Id**

```js
axios({
  method: "DELETE",
  url: `/v1/package_s/${package_Id}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "package_",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "package_": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "String",
    "price": "Double",
    "duration": "String",
    "conditions": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Packages` API

Lists all packages/extras available for reservations. Staff usage, can be used for guest package selection in reservation context.

The `listPackages` API REST controller can be triggered via the following route:

`/v1/packages`

**Rest Request Parameters**
The `listPackages` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/packages**

```js
axios({
  method: "GET",
  url: "/v1/packages",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "package_s",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "package_s": [
    {
      "id": "ID",
      "_owner": "ID",
      "name": "String",
      "description": "String",
      "price": "Double",
      "duration": "String",
      "conditions": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## PackageReservationMapping Service

Handles mappings between hotel reservations and selected packages/extras. Provides CRUD for staff to associate, update, or remove package associations on reservations. Enforces (reservationId, packageId) uniqueness per mapping. No guest/self-service APIs.

### PackageReservationMapping Service Data Objects

**PackageReservation**
Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.

### PackageReservationMapping Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/packagereservationmapping-api`
- **Staging:** `https://db-stage.mindbricks.co/packagereservationmapping-api`
- **Production:** `https://db.mindbricks.co/packagereservationmapping-api`

#### `Create Packagereservation` API

Creates a new package-reservation mapping. Fails if this (reservationId, packageId) pair already exists.

The `createPackageReservation` API REST controller can be triggered via the following route:

`/v1/packagereservations`

**Rest Request Parameters**

The `createPackageReservation` api has got 4 request parameters

| Parameter      | Type   | Required | Population                   |
| -------------- | ------ | -------- | ---------------------------- |
| reservationId  | ID     | true     | request.body?.reservationId  |
| packageId      | ID     | true     | request.body?.packageId      |
| priceAtBooking | Double | true     | request.body?.priceAtBooking |
| notes          | String | false    | request.body?.notes          |

**reservationId** : Reference to the reservation that this package is linked to.
**packageId** : Reference to the package/extra selected for the reservation.
**priceAtBooking** : Unit price of the package at the time of booking. Used for historical pricing and audit.
**notes** : Optional staff note about the package-reservation mapping.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/packagereservations**

```js
axios({
  method: "POST",
  url: "/v1/packagereservations",
  data: {
    reservationId: "ID",
    packageId: "ID",
    priceAtBooking: "Double",
    notes: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "packageReservation",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "packageReservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "packageId": "ID",
    "priceAtBooking": "Double",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Packagereservation` API

Update the price or notes in a package-reservation mapping, or (rare) fix package or reservation linkage. Fails if updated (reservationId, packageId) would create duplicate.

The `updatePackageReservation` API REST controller can be triggered via the following route:

`/v1/packagereservations/:packageReservationId`

**Rest Request Parameters**

The `updatePackageReservation` api has got 5 request parameters

| Parameter            | Type   | Required | Population                           |
| -------------------- | ------ | -------- | ------------------------------------ |
| packageReservationId | ID     | true     | request.params?.packageReservationId |
| reservationId        | ID     | false    | request.body?.reservationId          |
| packageId            | ID     | false    | request.body?.packageId              |
| priceAtBooking       | Double | false    | request.body?.priceAtBooking         |
| notes                | String | false    | request.body?.notes                  |

**packageReservationId** : This id paremeter is used to select the required data object that will be updated
**reservationId** : Reference to the reservation that this package is linked to.
**packageId** : Reference to the package/extra selected for the reservation.
**priceAtBooking** : Unit price of the package at the time of booking. Used for historical pricing and audit.
**notes** : Optional staff note about the package-reservation mapping.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/packagereservations/:packageReservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/packagereservations/${packageReservationId}`,
  data: {
    reservationId: "ID",
    packageId: "ID",
    priceAtBooking: "Double",
    notes: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "packageReservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "packageReservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "packageId": "ID",
    "priceAtBooking": "Double",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Packagereservation` API

Deletes (soft or hard) an existing package-reservation mapping. Used for unlinking extras from reservations.

The `deletePackageReservation` API REST controller can be triggered via the following route:

`/v1/packagereservations/:packageReservationId`

**Rest Request Parameters**

The `deletePackageReservation` api has got 1 request parameter

| Parameter            | Type | Required | Population                           |
| -------------------- | ---- | -------- | ------------------------------------ |
| packageReservationId | ID   | true     | request.params?.packageReservationId |

**packageReservationId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/packagereservations/:packageReservationId**

```js
axios({
  method: "DELETE",
  url: `/v1/packagereservations/${packageReservationId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "packageReservation",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "packageReservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "packageId": "ID",
    "priceAtBooking": "Double",
    "notes": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Packagereservation` API

Retrieves a package-reservation mapping by its ID for staff use or internal reference.

The `getPackageReservation` API REST controller can be triggered via the following route:

`/v1/packagereservations/:packageReservationId`

**Rest Request Parameters**

The `getPackageReservation` api has got 1 request parameter

| Parameter            | Type | Required | Population                           |
| -------------------- | ---- | -------- | ------------------------------------ |
| packageReservationId | ID   | true     | request.params?.packageReservationId |

**packageReservationId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/packagereservations/:packageReservationId**

```js
axios({
  method: "GET",
  url: `/v1/packagereservations/${packageReservationId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "packageReservation",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "packageReservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "packageId": "ID",
    "priceAtBooking": "Double",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Packagereservations` API

Lists all package-reservation mappings, supporting filter by reservationId and packageId. Staff/internal only.

The `listPackageReservations` API REST controller can be triggered via the following route:

`/v1/packagereservations`

**Rest Request Parameters**
The `listPackageReservations` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/packagereservations**

```js
axios({
  method: "GET",
  url: "/v1/packagereservations",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "packageReservations",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "packageReservations": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationId": "ID",
      "packageId": "ID",
      "priceAtBooking": "Double",
      "notes": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## SpecialRequestManagement Service

Handles special requests raised by hotel guests and staff, enabling CRUD operations on special guest requests linked to reservations. Both public guest (via reservation code) and staff operations are supported. Includes workflow for request creation, fulfillment, cancellation, and staff response.

### SpecialRequestManagement Service Data Objects

**SpecialRequest**
Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.

### SpecialRequestManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/specialrequestmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/specialrequestmanagement-api`
- **Production:** `https://db.mindbricks.co/specialrequestmanagement-api`

#### `Create Specialrequest` API

Staff API to create a special request for a given reservation and guest.

The `createSpecialRequest` API REST controller can be triggered via the following route:

`/v1/specialrequests`

**Rest Request Parameters**

The `createSpecialRequest` api has got 5 request parameters

| Parameter     | Type   | Required | Population                  |
| ------------- | ------ | -------- | --------------------------- |
| reservationId | ID     | true     | request.body?.reservationId |
| guestId       | ID     | true     | request.body?.guestId       |
| requestText   | String | true     | request.body?.requestText   |
| status        | Enum   | true     | request.body?.status        |
| response      | String | false    | request.body?.response      |

**reservationId** : Reference to the reservation for this special request.
**guestId** : ID of the guest who made this special request (redundant for tracing, resolved via reservation also).
**requestText** : Text description of the guest's special request.
**status** : Current status of the special request ('pending','fulfilled','canceled').
**response** : Staff action or response to the special request (free text).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/specialrequests**

```js
axios({
  method: "POST",
  url: "/v1/specialrequests",
  data: {
    reservationId: "ID",
    guestId: "ID",
    requestText: "String",
    status: "Enum",
    response: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Specialrequest` API

Staff API to update a special request by ID. Can edit status, response, or requestText.

The `updateSpecialRequest` API REST controller can be triggered via the following route:

`/v1/specialrequests/:specialRequestId`

**Rest Request Parameters**

The `updateSpecialRequest` api has got 6 request parameters

| Parameter        | Type   | Required | Population                       |
| ---------------- | ------ | -------- | -------------------------------- |
| specialRequestId | ID     | true     | request.params?.specialRequestId |
| reservationId    | ID     | false    | request.body?.reservationId      |
| guestId          | ID     | false    | request.body?.guestId            |
| requestText      | String | false    | request.body?.requestText        |
| status           | Enum   | false    | request.body?.status             |
| response         | String | false    | request.body?.response           |

**specialRequestId** : This id paremeter is used to select the required data object that will be updated
**reservationId** : Reference to the reservation for this special request.
**guestId** : ID of the guest who made this special request (redundant for tracing, resolved via reservation also).
**requestText** : Text description of the guest's special request.
**status** : Current status of the special request ('pending','fulfilled','canceled').
**response** : Staff action or response to the special request (free text).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/specialrequests/:specialRequestId**

```js
axios({
  method: "PATCH",
  url: `/v1/specialrequests/${specialRequestId}`,
  data: {
    reservationId: "ID",
    guestId: "ID",
    requestText: "String",
    status: "Enum",
    response: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Specialrequest` API

Staff API to retrieve a special request by its ID.

The `getSpecialRequest` API REST controller can be triggered via the following route:

`/v1/specialrequests/:specialRequestId`

**Rest Request Parameters**

The `getSpecialRequest` api has got 1 request parameter

| Parameter        | Type | Required | Population                       |
| ---------------- | ---- | -------- | -------------------------------- |
| specialRequestId | ID   | true     | request.params?.specialRequestId |

**specialRequestId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/specialrequests/:specialRequestId**

```js
axios({
  method: "GET",
  url: `/v1/specialrequests/${specialRequestId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Specialrequest` API

Staff API to delete (soft delete) a special request by ID.

The `deleteSpecialRequest` API REST controller can be triggered via the following route:

`/v1/specialrequests/:specialRequestId`

**Rest Request Parameters**

The `deleteSpecialRequest` api has got 1 request parameter

| Parameter        | Type | Required | Population                       |
| ---------------- | ---- | -------- | -------------------------------- |
| specialRequestId | ID   | true     | request.params?.specialRequestId |

**specialRequestId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/specialrequests/:specialRequestId**

```js
axios({
  method: "DELETE",
  url: `/v1/specialrequests/${specialRequestId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Specialrequests` API

Staff API to list all special requests, with filter by reservationId, guestId, status. Internal use for fulfillment and monitoring.

The `listSpecialRequests` API REST controller can be triggered via the following route:

`/v1/specialrequests`

**Rest Request Parameters**
The `listSpecialRequests` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/specialrequests**

```js
axios({
  method: "GET",
  url: "/v1/specialrequests",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequests",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "specialRequests": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationId": "ID",
      "guestId": "ID",
      "requestText": "String",
      "status": "Enum",
      "status_": "String",
      "response": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

#### `Create Specialrequestpublic` API

Guest self-service: create a special request associated with their reservation (by reservationCode).

The `createSpecialRequestPublic` API REST controller can be triggered via the following route:

`/v1/specialrequestpublic`

**Rest Request Parameters**

The `createSpecialRequestPublic` api has got 5 request parameters

| Parameter     | Type   | Required | Population                  |
| ------------- | ------ | -------- | --------------------------- |
| reservationId | ID     | true     | request.body?.reservationId |
| guestId       | ID     | true     | request.body?.guestId       |
| requestText   | String | true     | request.body?.requestText   |
| status        | Enum   | true     | request.body?.status        |
| response      | String | false    | request.body?.response      |

**reservationId** : Reference to the reservation for this special request.
**guestId** : ID of the guest who made this special request (redundant for tracing, resolved via reservation also).
**requestText** : Text description of the guest's special request.
**status** : Current status of the special request ('pending','fulfilled','canceled').
**response** : Staff action or response to the special request (free text).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/specialrequestpublic**

```js
axios({
  method: "POST",
  url: "/v1/specialrequestpublic",
  data: {
    reservationId: "ID",
    guestId: "ID",
    requestText: "String",
    status: "Enum",
    response: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Specialrequestsbycode` API

Guest public/self-service: list all their special requests, filtered by reservationCode (returned after payment/booking).

The `listSpecialRequestsByCode` API REST controller can be triggered via the following route:

`/v1/specialrequestsbycode`

**Rest Request Parameters**
The `listSpecialRequestsByCode` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/specialrequestsbycode**

```js
axios({
  method: "GET",
  url: "/v1/specialrequestsbycode",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequests",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "specialRequests": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationId": "ID",
      "guestId": "ID",
      "requestText": "String",
      "status": "Enum",
      "status_": "String",
      "response": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

#### `Get Specialrequestbycode` API

Guest public/self-service: retrieve a specific special request for their reservation (by reservationCode and specialRequestId).

The `getSpecialRequestByCode` API REST controller can be triggered via the following route:

`/v1/specialrequestbycode/:specialRequestId`

**Rest Request Parameters**

The `getSpecialRequestByCode` api has got 1 request parameter

| Parameter        | Type | Required | Population                       |
| ---------------- | ---- | -------- | -------------------------------- |
| specialRequestId | ID   | true     | request.params?.specialRequestId |

**specialRequestId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/specialrequestbycode/:specialRequestId**

```js
axios({
  method: "GET",
  url: `/v1/specialrequestbycode/${specialRequestId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Cancel Specialrequestbycode` API

Guest public/self-service: cancel their own (pending, unfulfilled) special request using reservationCode. Only possible by matching code and if status is 'pending'.

The `cancelSpecialRequestByCode` API REST controller can be triggered via the following route:

`/v1/cancelspecialrequestbycode/:specialRequestId`

**Rest Request Parameters**

The `cancelSpecialRequestByCode` api has got 6 request parameters

| Parameter        | Type   | Required | Population                       |
| ---------------- | ------ | -------- | -------------------------------- |
| specialRequestId | ID     | true     | request.params?.specialRequestId |
| reservationId    | ID     | false    | request.body?.reservationId      |
| guestId          | ID     | false    | request.body?.guestId            |
| requestText      | String | false    | request.body?.requestText        |
| status           | Enum   | false    | request.body?.status             |
| response         | String | false    | request.body?.response           |

**specialRequestId** : This id paremeter is used to select the required data object that will be updated
**reservationId** : Reference to the reservation for this special request.
**guestId** : ID of the guest who made this special request (redundant for tracing, resolved via reservation also).
**requestText** : Text description of the guest's special request.
**status** : Current status of the special request ('pending','fulfilled','canceled').
**response** : Staff action or response to the special request (free text).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/cancelspecialrequestbycode/:specialRequestId**

```js
axios({
  method: "PATCH",
  url: `/v1/cancelspecialrequestbycode/${specialRequestId}`,
  data: {
    reservationId: "ID",
    guestId: "ID",
    requestText: "String",
    status: "Enum",
    response: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "specialRequest",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "specialRequest": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestId": "ID",
    "requestText": "String",
    "status": "Enum",
    "status_": "String",
    "response": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## PaymentManagement Service

Tracks all payment records for reservations, handled via redirection to external gateway (no embedded payment processing). Records payment status, method, and reference details for auditing. Associates payments with reservations for reconciliation.

### PaymentManagement Service Data Objects

**Payment**
Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.

### PaymentManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/paymentmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/paymentmanagement-api`
- **Production:** `https://db.mindbricks.co/paymentmanagement-api`

#### `Create Payment` API

Creates a new payment record associated with a reservation, logs status, method, and reference info.

The `createPayment` API REST controller can be triggered via the following route:

`/v1/payments`

**Rest Request Parameters**

The `createPayment` api has got 6 request parameters

| Parameter        | Type   | Required | Population                     |
| ---------------- | ------ | -------- | ------------------------------ |
| reservationId    | ID     | true     | request.body?.reservationId    |
| amount           | Double | true     | request.body?.amount           |
| paymentStatus    | Enum   | true     | request.body?.paymentStatus    |
| paymentMethod    | Enum   | true     | request.body?.paymentMethod    |
| gatewayReference | String | false    | request.body?.gatewayReference |
| processedAt      | Date   | false    | request.body?.processedAt      |

**reservationId** : Reference to the reservation for which this payment was made.
**amount** : Amount paid in this transaction (in hotel's default currency).
**paymentStatus** : Current status of the payment (pending, successful, failed, refunded).
**paymentMethod** : How the payment was attempted: external gateway, cash, or card (staff-side record).
**gatewayReference** : External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation.
**processedAt** : Date/time the payment was processed, confirmed, or failed.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/payments**

```js
axios({
  method: "POST",
  url: "/v1/payments",
  data: {
    reservationId: "ID",
    amount: "Double",
    paymentStatus: "Enum",
    paymentMethod: "Enum",
    gatewayReference: "String",
    processedAt: "Date",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "payment",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "payment": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "amount": "Double",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "paymentMethod": "Enum",
    "paymentMethod_": "String",
    "gatewayReference": "String",
    "processedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Payment` API

Updates a payment record by ID (e.g., after payment attempt completed, status update, or reconciliation).

The `updatePayment` API REST controller can be triggered via the following route:

`/v1/payments/:paymentId`

**Rest Request Parameters**

The `updatePayment` api has got 7 request parameters

| Parameter        | Type   | Required | Population                     |
| ---------------- | ------ | -------- | ------------------------------ |
| paymentId        | ID     | true     | request.params?.paymentId      |
| reservationId    | ID     | false    | request.body?.reservationId    |
| amount           | Double | false    | request.body?.amount           |
| paymentStatus    | Enum   | false    | request.body?.paymentStatus    |
| paymentMethod    | Enum   | false    | request.body?.paymentMethod    |
| gatewayReference | String | false    | request.body?.gatewayReference |
| processedAt      | Date   | false    | request.body?.processedAt      |

**paymentId** : This id paremeter is used to select the required data object that will be updated
**reservationId** : Reference to the reservation for which this payment was made.
**amount** : Amount paid in this transaction (in hotel's default currency).
**paymentStatus** : Current status of the payment (pending, successful, failed, refunded).
**paymentMethod** : How the payment was attempted: external gateway, cash, or card (staff-side record).
**gatewayReference** : External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation.
**processedAt** : Date/time the payment was processed, confirmed, or failed.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/payments/:paymentId**

```js
axios({
  method: "PATCH",
  url: `/v1/payments/${paymentId}`,
  data: {
    reservationId: "ID",
    amount: "Double",
    paymentStatus: "Enum",
    paymentMethod: "Enum",
    gatewayReference: "String",
    processedAt: "Date",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "payment",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "payment": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "amount": "Double",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "paymentMethod": "Enum",
    "paymentMethod_": "String",
    "gatewayReference": "String",
    "processedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Payment` API

Deletes a payment record (soft delete if enabled) for maintenance or correction (staff/internal use only).

The `deletePayment` API REST controller can be triggered via the following route:

`/v1/payments/:paymentId`

**Rest Request Parameters**

The `deletePayment` api has got 1 request parameter

| Parameter | Type | Required | Population                |
| --------- | ---- | -------- | ------------------------- |
| paymentId | ID   | true     | request.params?.paymentId |

**paymentId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/payments/:paymentId**

```js
axios({
  method: "DELETE",
  url: `/v1/payments/${paymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "payment",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "payment": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "amount": "Double",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "paymentMethod": "Enum",
    "paymentMethod_": "String",
    "gatewayReference": "String",
    "processedAt": "Date",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Payment` API

Retrieves a single payment record by ID for auditing, troubleshooting, or follow-up (staff/internal only).

The `getPayment` API REST controller can be triggered via the following route:

`/v1/payments/:paymentId`

**Rest Request Parameters**

The `getPayment` api has got 1 request parameter

| Parameter | Type | Required | Population                |
| --------- | ---- | -------- | ------------------------- |
| paymentId | ID   | true     | request.params?.paymentId |

**paymentId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/payments/:paymentId**

```js
axios({
  method: "GET",
  url: `/v1/payments/${paymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "payment",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "payment": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "amount": "Double",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "paymentMethod": "Enum",
    "paymentMethod_": "String",
    "gatewayReference": "String",
    "processedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Payments` API

Lists all payment records, with optional filters by reservationId, status, date, etc. Enables audit, reconciliation, and search (staff/internal).

The `listPayments` API REST controller can be triggered via the following route:

`/v1/payments`

**Rest Request Parameters**
The `listPayments` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/payments**

```js
axios({
  method: "GET",
  url: "/v1/payments",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "payments",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "payments": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationId": "ID",
      "amount": "Double",
      "paymentStatus": "Enum",
      "paymentStatus_": "String",
      "paymentMethod": "Enum",
      "paymentMethod_": "String",
      "gatewayReference": "String",
      "processedAt": "Date",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## RoomPricing Service

Maintains historical and current room pricing data per room; supports CRUD for pricing records, date ranges, and promotional types. Provides price lookup for reservation and availability workflows.

### RoomPricing Service Data Objects

**RoomPrice**
Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.

### RoomPricing Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/roompricing-api`
- **Staging:** `https://db-stage.mindbricks.co/roompricing-api`
- **Production:** `https://db.mindbricks.co/roompricing-api`

#### `Create Roomprice` API

Creates a new room price record for a specific room and date range with specified price and type. Staff use only.

The `createRoomPrice` API REST controller can be triggered via the following route:

`/v1/roomprices`

**Rest Request Parameters**

The `createRoomPrice` api has got 6 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| roomId      | ID     | true     | request.body?.roomId      |
| startDate   | Date   | true     | request.body?.startDate   |
| endDate     | Date   | false    | request.body?.endDate     |
| price       | Double | true     | request.body?.price       |
| priceType   | Enum   | true     | request.body?.priceType   |
| description | String | false    | request.body?.description |

**roomId** : Reference to the room for which this price is applicable.
**startDate** : Start date from which this price is effective (inclusive).
**endDate** : Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates.
**price** : Price value for this room and date range, in hotel currency.
**priceType** : Price type: standard, promotional, or seasonal.
**description** : Staff-facing description or note for this price entry.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/roomprices**

```js
axios({
  method: "POST",
  url: "/v1/roomprices",
  data: {
    roomId: "ID",
    startDate: "Date",
    endDate: "Date",
    price: "Double",
    priceType: "Enum",
    description: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "roomPrice",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "roomPrice": {
    "id": "ID",
    "_owner": "ID",
    "roomId": "ID",
    "startDate": "Date",
    "endDate": "Date",
    "price": "Double",
    "priceType": "Enum",
    "priceType_": "String",
    "description": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Roomprice` API

Updates an existing room price record. Allows adjustment of price, dates, type, or description for staff maintenance.

The `updateRoomPrice` API REST controller can be triggered via the following route:

`/v1/roomprices/:roomPriceId`

**Rest Request Parameters**

The `updateRoomPrice` api has got 7 request parameters

| Parameter   | Type   | Required | Population                  |
| ----------- | ------ | -------- | --------------------------- |
| roomPriceId | ID     | true     | request.params?.roomPriceId |
| roomId      | ID     | false    | request.body?.roomId        |
| startDate   | Date   | false    | request.body?.startDate     |
| endDate     | Date   | false    | request.body?.endDate       |
| price       | Double | false    | request.body?.price         |
| priceType   | Enum   | false    | request.body?.priceType     |
| description | String | false    | request.body?.description   |

**roomPriceId** : This id paremeter is used to select the required data object that will be updated
**roomId** : Reference to the room for which this price is applicable.
**startDate** : Start date from which this price is effective (inclusive).
**endDate** : Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates.
**price** : Price value for this room and date range, in hotel currency.
**priceType** : Price type: standard, promotional, or seasonal.
**description** : Staff-facing description or note for this price entry.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/roomprices/:roomPriceId**

```js
axios({
  method: "PATCH",
  url: `/v1/roomprices/${roomPriceId}`,
  data: {
    roomId: "ID",
    startDate: "Date",
    endDate: "Date",
    price: "Double",
    priceType: "Enum",
    description: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "roomPrice",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "roomPrice": {
    "id": "ID",
    "_owner": "ID",
    "roomId": "ID",
    "startDate": "Date",
    "endDate": "Date",
    "price": "Double",
    "priceType": "Enum",
    "priceType_": "String",
    "description": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Roomprice` API

Deletes a room price record (soft delete enabled). Used for maintenance or removing outdated/invalid prices. Staff use only.

The `deleteRoomPrice` API REST controller can be triggered via the following route:

`/v1/roomprices/:roomPriceId`

**Rest Request Parameters**

The `deleteRoomPrice` api has got 1 request parameter

| Parameter   | Type | Required | Population                  |
| ----------- | ---- | -------- | --------------------------- |
| roomPriceId | ID   | true     | request.params?.roomPriceId |

**roomPriceId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/roomprices/:roomPriceId**

```js
axios({
  method: "DELETE",
  url: `/v1/roomprices/${roomPriceId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "roomPrice",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "roomPrice": {
    "id": "ID",
    "_owner": "ID",
    "roomId": "ID",
    "startDate": "Date",
    "endDate": "Date",
    "price": "Double",
    "priceType": "Enum",
    "priceType_": "String",
    "description": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Roomprice` API

Retrieves a room price record by ID. Used by staff workflows or internal system modules.

The `getRoomPrice` API REST controller can be triggered via the following route:

`/v1/roomprices/:roomPriceId`

**Rest Request Parameters**

The `getRoomPrice` api has got 1 request parameter

| Parameter   | Type | Required | Population                  |
| ----------- | ---- | -------- | --------------------------- |
| roomPriceId | ID   | true     | request.params?.roomPriceId |

**roomPriceId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/roomprices/:roomPriceId**

```js
axios({
  method: "GET",
  url: `/v1/roomprices/${roomPriceId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "roomPrice",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "roomPrice": {
    "id": "ID",
    "_owner": "ID",
    "roomId": "ID",
    "startDate": "Date",
    "endDate": "Date",
    "price": "Double",
    "priceType": "Enum",
    "priceType_": "String",
    "description": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Roomprices` API

Lists all room price records, with optional filtering by roomId, priceType, startDate, or endDate. Used for management, reporting, or availability queries.

The `listRoomPrices` API REST controller can be triggered via the following route:

`/v1/roomprices`

**Rest Request Parameters**
The `listRoomPrices` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/roomprices**

```js
axios({
  method: "GET",
  url: "/v1/roomprices",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "roomPrices",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "roomPrices": [
    {
      "id": "ID",
      "_owner": "ID",
      "roomId": "ID",
      "startDate": "Date",
      "endDate": "Date",
      "price": "Double",
      "priceType": "Enum",
      "priceType_": "String",
      "description": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## FeedbackManagement Service

Collects, stores, and manages feedback submitted by guests after stay completion. Enables staff to review, moderate, and delete feedback for quality control.

### FeedbackManagement Service Data Objects

**Feedback**
Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.

### FeedbackManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/feedbackmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/feedbackmanagement-api`
- **Production:** `https://db.mindbricks.co/feedbackmanagement-api`

#### `Create Feedbackguest` API

Allows guest to submit feedback after stay by reservation code, guest name, rating (1–5), and comment. Only permitted if reservation exists and status is 'completed'. `submittedAt` is set automatically. No authentication required.

The `createFeedbackGuest` API REST controller can be triggered via the following route:

`/v1/feedbackguest`

**Rest Request Parameters**

The `createFeedbackGuest` api has got 4 request parameters

| Parameter     | Type    | Required | Population                  |
| ------------- | ------- | -------- | --------------------------- |
| reservationId | ID      | true     | request.body?.reservationId |
| guestName     | String  | true     | request.body?.guestName     |
| rating        | Integer | true     | request.body?.rating        |
| comment       | Text    | true     | request.body?.comment       |

**reservationId** : Reference to the reservation for which feedback is submitted. Used for traceability and eligibility check.
**guestName** : Name of the guest submitting feedback (free text).
**rating** : Rating from 1 to 5 reflecting guest's satisfaction.
**comment** : Free-text feedback, comment on guest's experience.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/feedbackguest**

```js
axios({
  method: "POST",
  url: "/v1/feedbackguest",
  data: {
    reservationId: "ID",
    guestName: "String",
    rating: "Integer",
    comment: "Text",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "feedback",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "feedback": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestName": "String",
    "rating": "Integer",
    "comment": "Text",
    "submittedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Feedback` API

Retrieves a feedback record by ID for staff moderation or review.

The `getFeedback` API REST controller can be triggered via the following route:

`/v1/feedbacks/:feedbackId`

**Rest Request Parameters**

The `getFeedback` api has got 1 request parameter

| Parameter  | Type | Required | Population                 |
| ---------- | ---- | -------- | -------------------------- |
| feedbackId | ID   | true     | request.params?.feedbackId |

**feedbackId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/feedbacks/:feedbackId**

```js
axios({
  method: "GET",
  url: `/v1/feedbacks/${feedbackId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "feedback",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "feedback": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestName": "String",
    "rating": "Integer",
    "comment": "Text",
    "submittedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Feedback` API

Updates a feedback record, for use by staff moderation or error correction.

The `updateFeedback` API REST controller can be triggered via the following route:

`/v1/feedbacks/:feedbackId`

**Rest Request Parameters**

The `updateFeedback` api has got 4 request parameters

| Parameter  | Type    | Required | Population                 |
| ---------- | ------- | -------- | -------------------------- |
| feedbackId | ID      | true     | request.params?.feedbackId |
| guestName  | String  | false    | request.body?.guestName    |
| rating     | Integer | false    | request.body?.rating       |
| comment    | Text    | false    | request.body?.comment      |

**feedbackId** : This id paremeter is used to select the required data object that will be updated
**guestName** : Name of the guest submitting feedback (free text).
**rating** : Rating from 1 to 5 reflecting guest's satisfaction.
**comment** : Free-text feedback, comment on guest's experience.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/feedbacks/:feedbackId**

```js
axios({
  method: "PATCH",
  url: `/v1/feedbacks/${feedbackId}`,
  data: {
    guestName: "String",
    rating: "Integer",
    comment: "Text",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "feedback",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "feedback": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestName": "String",
    "rating": "Integer",
    "comment": "Text",
    "submittedAt": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Feedback` API

Deletes a feedback record (soft delete). Staff only. Used for curation and moderation.

The `deleteFeedback` API REST controller can be triggered via the following route:

`/v1/feedbacks/:feedbackId`

**Rest Request Parameters**

The `deleteFeedback` api has got 1 request parameter

| Parameter  | Type | Required | Population                 |
| ---------- | ---- | -------- | -------------------------- |
| feedbackId | ID   | true     | request.params?.feedbackId |

**feedbackId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/feedbacks/:feedbackId**

```js
axios({
  method: "DELETE",
  url: `/v1/feedbacks/${feedbackId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "feedback",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "feedback": {
    "id": "ID",
    "_owner": "ID",
    "reservationId": "ID",
    "guestName": "String",
    "rating": "Integer",
    "comment": "Text",
    "submittedAt": "Date",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Feedbacks` API

Lists all feedback records for staff moderation or review. Supports filtering by guestName, reservationId, rating, and submittedAt.

The `listFeedbacks` API REST controller can be triggered via the following route:

`/v1/feedbacks`

**Rest Request Parameters**
The `listFeedbacks` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/feedbacks**

```js
axios({
  method: "GET",
  url: "/v1/feedbacks",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "feedbacks",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "feedbacks": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationId": "ID",
      "guestName": "String",
      "rating": "Integer",
      "comment": "Text",
      "submittedAt": "Date",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## PersonnelManagement Service

Manages routine CRUD operations for hotel staff/personnel records needed for operational management—not auth or sensitive HR—serving a single hotel context.

### PersonnelManagement Service Data Objects

**Personnel**
Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.

### PersonnelManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://db.prw.mindbricks.com/personnelmanagement-api`
- **Staging:** `https://db-stage.mindbricks.co/personnelmanagement-api`
- **Production:** `https://db.mindbricks.co/personnelmanagement-api`

#### `Create Personnel` API

Creates a new personnel (staff) record in the hotel system for operational use. All fields except endDate and notes are required.

The `createPersonnel` API REST controller can be triggered via the following route:

`/v1/personnels`

**Rest Request Parameters**

The `createPersonnel` api has got 7 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| name        | String | true     | request.body?.name        |
| jobTitle    | String | true     | request.body?.jobTitle    |
| department  | String | true     | request.body?.department  |
| startDate   | Date   | true     | request.body?.startDate   |
| endDate     | Date   | false    | request.body?.endDate     |
| contactInfo | String | true     | request.body?.contactInfo |
| notes       | String | false    | request.body?.notes       |

**name** : Full name of the employee/staff member.
**jobTitle** : Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).
**department** : Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).
**startDate** : Date staff member started employment or became active at the hotel.
**endDate** : Date staff member left or ended employment (null if current).
**contactInfo** : Contact information for operational use (email, phone, or other). Not sensitive HR data.
**notes** : Internal operational notes about the staff member (free text, not sensitive HR data). Optional.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/personnels**

```js
axios({
  method: "POST",
  url: "/v1/personnels",
  data: {
    name: "String",
    jobTitle: "String",
    department: "String",
    startDate: "Date",
    endDate: "Date",
    contactInfo: "String",
    notes: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "personnel",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "personnel": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "jobTitle": "String",
    "department": "String",
    "startDate": "Date",
    "endDate": "Date",
    "contactInfo": "String",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Personnel` API

Updates an existing personnel record by ID. Allows modification of any personnel field for operational management.

The `updatePersonnel` API REST controller can be triggered via the following route:

`/v1/personnels/:personnelId`

**Rest Request Parameters**

The `updatePersonnel` api has got 8 request parameters

| Parameter   | Type   | Required | Population                  |
| ----------- | ------ | -------- | --------------------------- |
| personnelId | ID     | true     | request.params?.personnelId |
| name        | String | false    | request.body?.name          |
| jobTitle    | String | false    | request.body?.jobTitle      |
| department  | String | false    | request.body?.department    |
| startDate   | Date   | false    | request.body?.startDate     |
| endDate     | Date   | false    | request.body?.endDate       |
| contactInfo | String | false    | request.body?.contactInfo   |
| notes       | String | false    | request.body?.notes         |

**personnelId** : This id paremeter is used to select the required data object that will be updated
**name** : Full name of the employee/staff member.
**jobTitle** : Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).
**department** : Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).
**startDate** : Date staff member started employment or became active at the hotel.
**endDate** : Date staff member left or ended employment (null if current).
**contactInfo** : Contact information for operational use (email, phone, or other). Not sensitive HR data.
**notes** : Internal operational notes about the staff member (free text, not sensitive HR data). Optional.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/personnels/:personnelId**

```js
axios({
  method: "PATCH",
  url: `/v1/personnels/${personnelId}`,
  data: {
    name: "String",
    jobTitle: "String",
    department: "String",
    startDate: "Date",
    endDate: "Date",
    contactInfo: "String",
    notes: "String",
  },
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "personnel",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "personnel": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "jobTitle": "String",
    "department": "String",
    "startDate": "Date",
    "endDate": "Date",
    "contactInfo": "String",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Personnel` API

Deletes (soft delete) a personnel record by ID in the system. Used for managing inactive/exited staff records.

The `deletePersonnel` API REST controller can be triggered via the following route:

`/v1/personnels/:personnelId`

**Rest Request Parameters**

The `deletePersonnel` api has got 1 request parameter

| Parameter   | Type | Required | Population                  |
| ----------- | ---- | -------- | --------------------------- |
| personnelId | ID   | true     | request.params?.personnelId |

**personnelId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/personnels/:personnelId**

```js
axios({
  method: "DELETE",
  url: `/v1/personnels/${personnelId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "personnel",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "personnel": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "jobTitle": "String",
    "department": "String",
    "startDate": "Date",
    "endDate": "Date",
    "contactInfo": "String",
    "notes": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Personnel` API

Retrieves a personnel record by ID for operational staff management purposes. Returns all available details for the staff member.

The `getPersonnel` API REST controller can be triggered via the following route:

`/v1/personnels/:personnelId`

**Rest Request Parameters**

The `getPersonnel` api has got 1 request parameter

| Parameter   | Type | Required | Population                  |
| ----------- | ---- | -------- | --------------------------- |
| personnelId | ID   | true     | request.params?.personnelId |

**personnelId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/personnels/:personnelId**

```js
axios({
  method: "GET",
  url: `/v1/personnels/${personnelId}`,
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "personnel",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "personnel": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "jobTitle": "String",
    "department": "String",
    "startDate": "Date",
    "endDate": "Date",
    "contactInfo": "String",
    "notes": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Personnels` API

Lists all personnel (staff) records in the hotel system. Supports filtering by name, jobTitle, department, startDate, endDate, contactInfo. Used for operational views and reporting.

The `listPersonnels` API REST controller can be triggered via the following route:

`/v1/personnels`

**Rest Request Parameters**
The `listPersonnels` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/personnels**

```js
axios({
  method: "GET",
  url: "/v1/personnels",
  data: {},
  params: {},
});
```

**REST Response**

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "personnels",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "personnels": [
    {
      "id": "ID",
      "_owner": "ID",
      "name": "String",
      "jobTitle": "String",
      "department": "String",
      "startDate": "Date",
      "endDate": "Date",
      "contactInfo": "String",
      "notes": "String",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```
