# API INTEGRATION PATTERNS

## Db Admin Panel

This document provides comprehensive information about API integration patterns used in the Db Admin Panel, including HTTP client configuration, request/response handling, error management, and performance optimization strategies.

## Architectural Design Credit and Contact Information

The architectural design of this API integration system is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this API integration system.

## Documentation Scope

This guide covers the complete API integration patterns within the Db Admin Panel. It includes HTTP client configuration, request/response handling, error management, caching strategies, and performance optimization techniques.

**Intended Audience**

This documentation is intended for frontend developers, API integrators, and system architects who need to understand, implement, or maintain API integration patterns within the admin panel.

## HTTP Client Architecture

### Service-Specific Axios Instances

**GuestManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const guestManagementAxiosInstance = axios.create({
  baseURL: CONFIG.guestManagementServiceUrl,
});

guestManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default guestManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await guestManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const guestManagementEndpoints = {
  guest: {
    createGuest: "/v1/guests",

    updateGuest: "/v1/guests/:guestId",

    getGuest: "/v1/guests/:guestId",

    deleteGuest: "/v1/guests/:guestId",

    listGuests: "/v1/guests",
  },
};
```

**RoomInventory Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const roomInventoryAxiosInstance = axios.create({
  baseURL: CONFIG.roomInventoryServiceUrl,
});

roomInventoryAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default roomInventoryAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await roomInventoryAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const roomInventoryEndpoints = {
  room: {
    updateRoom: "/v1/rooms/:roomId",

    getRoom: "/v1/rooms/:roomId",

    deleteRoom: "/v1/rooms/:roomId",

    listRooms: "/v1/rooms",

    listAvailableRooms: "/v1/availablerooms",
  },
};
```

**ReservationManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const reservationManagementAxiosInstance = axios.create({
  baseURL: CONFIG.reservationManagementServiceUrl,
});

reservationManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default reservationManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await reservationManagementAxiosInstance.get(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const reservationManagementEndpoints = {
  reservation: {
    createReservation: "/v1/reservations",

    updateReservation: "/v1/reservations/:reservationId",

    getReservation: "/v1/reservations/:reservationId",

    deleteReservation: "/v1/reservations/:reservationId",

    listReservations: "/v1/reservations",

    createReservationGuest: "/v1/reservationguest",

    confirmReservationPayment: "/v1/confirmreservationpayment/:reservationId",

    getReservationByCode: "/v1/reservationbycode/:reservationId",

    updateReservationByCode: "/v1/reservationbycode/:reservationId",

    cancelReservationByCode: "/v1/cancelreservationbycode/:reservationId",
  },
};
```

**PackageManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const packageManagementAxiosInstance = axios.create({
  baseURL: CONFIG.packageManagementServiceUrl,
});

packageManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default packageManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await packageManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const packageManagementEndpoints = {
  package_: {
    createPackage: "/v1/package_s",

    updatePackage: "/v1/package_s/:package_Id",

    getPackage: "/v1/package_s/:package_Id",

    deletePackage: "/v1/package_s/:package_Id",

    listPackages: "/v1/packages",
  },
};
```

**PackageReservationMapping Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const packageReservationMappingAxiosInstance = axios.create({
  baseURL: CONFIG.packageReservationMappingServiceUrl,
});

packageReservationMappingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default packageReservationMappingAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await packageReservationMappingAxiosInstance.get(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const packageReservationMappingEndpoints = {
  packageReservation: {
    createPackageReservation: "/v1/packagereservations",

    updatePackageReservation: "/v1/packagereservations/:packageReservationId",

    deletePackageReservation: "/v1/packagereservations/:packageReservationId",

    getPackageReservation: "/v1/packagereservations/:packageReservationId",

    listPackageReservations: "/v1/packagereservations",
  },
};
```

**SpecialRequestManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const specialRequestManagementAxiosInstance = axios.create({
  baseURL: CONFIG.specialRequestManagementServiceUrl,
});

specialRequestManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default specialRequestManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await specialRequestManagementAxiosInstance.get(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const specialRequestManagementEndpoints = {
  specialRequest: {
    createSpecialRequest: "/v1/specialrequests",

    updateSpecialRequest: "/v1/specialrequests/:specialRequestId",

    getSpecialRequest: "/v1/specialrequests/:specialRequestId",

    deleteSpecialRequest: "/v1/specialrequests/:specialRequestId",

    listSpecialRequests: "/v1/specialrequests",

    createSpecialRequestPublic: "/v1/specialrequestpublic",

    listSpecialRequestsByCode: "/v1/specialrequestsbycode",

    getSpecialRequestByCode: "/v1/specialrequestbycode/:specialRequestId",

    cancelSpecialRequestByCode:
      "/v1/cancelspecialrequestbycode/:specialRequestId",
  },
};
```

**PaymentManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const paymentManagementAxiosInstance = axios.create({
  baseURL: CONFIG.paymentManagementServiceUrl,
});

paymentManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default paymentManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await paymentManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const paymentManagementEndpoints = {
  payment: {
    createPayment: "/v1/payments",

    updatePayment: "/v1/payments/:paymentId",

    deletePayment: "/v1/payments/:paymentId",

    getPayment: "/v1/payments/:paymentId",

    listPayments: "/v1/payments",
  },
};
```

**RoomPricing Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const roomPricingAxiosInstance = axios.create({
  baseURL: CONFIG.roomPricingServiceUrl,
});

roomPricingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default roomPricingAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await roomPricingAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const roomPricingEndpoints = {
  roomPrice: {
    createRoomPrice: "/v1/roomprices",

    updateRoomPrice: "/v1/roomprices/:roomPriceId",

    deleteRoomPrice: "/v1/roomprices/:roomPriceId",

    getRoomPrice: "/v1/roomprices/:roomPriceId",

    listRoomPrices: "/v1/roomprices",
  },
};
```

**FeedbackManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const feedbackManagementAxiosInstance = axios.create({
  baseURL: CONFIG.feedbackManagementServiceUrl,
});

feedbackManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default feedbackManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await feedbackManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const feedbackManagementEndpoints = {
  feedback: {
    createFeedbackGuest: "/v1/feedbackguest",

    getFeedback: "/v1/feedbacks/:feedbackId",

    updateFeedback: "/v1/feedbacks/:feedbackId",

    deleteFeedback: "/v1/feedbacks/:feedbackId",

    listFeedbacks: "/v1/feedbacks",
  },
};
```

**PersonnelManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const personnelManagementAxiosInstance = axios.create({
  baseURL: CONFIG.personnelManagementServiceUrl,
});

personnelManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default personnelManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await personnelManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const personnelManagementEndpoints = {
  personnel: {
    createPersonnel: "/v1/personnels",

    updatePersonnel: "/v1/personnels/:personnelId",

    deletePersonnel: "/v1/personnels/:personnelId",

    getPersonnel: "/v1/personnels/:personnelId",

    listPersonnels: "/v1/personnels",
  },
};
```

**Auth Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const authAxiosInstance = axios.create({
  baseURL: CONFIG.authServiceUrl,
});

authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default authAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await authAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const authEndpoints = {
  login: "/login",
  me: "/v1/users/:userId",
  logout: "/logout",

  user: {
    getUser: "/v1/users/:userId",

    updateUser: "/v1/users/:userId",

    registerUser: "/v1/registeruser",

    deleteUser: "/v1/users/:userId",

    listUsers: "/v1/users",

    updateUserRole: "/v1/userrole/:userId",

    updateUserPassword: "/v1/userpassword/:userId",

    getBriefUser: "/v1/briefuser/:userId",
  },
};
```

### Service Integration

**GuestManagement Service Integration**

The GuestManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Guest` data object management

**RoomInventory Service Integration**

The RoomInventory service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Room` data object management

**ReservationManagement Service Integration**

The ReservationManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Reservation` data object management

**PackageManagement Service Integration**

The PackageManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Package_` data object management

**PackageReservationMapping Service Integration**

The PackageReservationMapping service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `PackageReservation` data object management

**SpecialRequestManagement Service Integration**

The SpecialRequestManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `SpecialRequest` data object management

**PaymentManagement Service Integration**

The PaymentManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Payment` data object management

**RoomPricing Service Integration**

The RoomPricing service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `RoomPrice` data object management

**FeedbackManagement Service Integration**

The FeedbackManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Feedback` data object management

**PersonnelManagement Service Integration**

The PersonnelManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Personnel` data object management

**Auth Service Integration**

The Auth service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `User` data object management

## Request/Response Patterns

### Standard Request Format

**Request Structure**

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await guestManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await roomInventoryAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await reservationManagementAxiosInstance.post(
  "/endpoint",
  data,
);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await packageManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await packageReservationMappingAxiosInstance.post(
  "/endpoint",
  data,
);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await specialRequestManagementAxiosInstance.post(
  "/endpoint",
  data,
);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await paymentManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await roomPricingAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await feedbackManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await personnelManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await authAxiosInstance.post("/endpoint", data);
```

### Response Handling

**Standard Response Format**

```javascript
// Success response
const response = await fetcher("/endpoint");
// response contains the data directly

// Error handling
try {
  const response = await fetcher("/endpoint");
} catch (error) {
  console.error("API Error:", error);
  // Error is already processed by the interceptor
}
```

### Pagination Handling

**Pagination Implementation**

```javascript
// Pagination is handled by the data grid component
// The MUI DataGrid handles pagination automatically
```

## Error Handling Patterns

### Error Classification

**Error Types**

```javascript
// Basic error handling through Axios interceptors
// Errors are processed and simplified before reaching components
```

### Error Handler

**Centralized Error Handling**

```javascript
class APIErrorHandler {
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return this.handleServerError(error);
    } else if (error.request) {
      // Network error
      return this.handleNetworkError(error);
    } else {
      // Other error
      return this.handleUnknownError(error);
    }
  }

  handleServerError(error) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return new ValidationError(
          data.message || "Validation failed",
          data.errors || [],
        );
      case 401:
        return new AuthenticationError(
          data.message || "Authentication required",
        );
      case 403:
        return new AuthorizationError(data.message || "Access denied");
      case 404:
        return new APIError(
          data.message || "Resource not found",
          404,
          "NOT_FOUND",
        );
      case 429:
        return new APIError(
          data.message || "Rate limit exceeded",
          429,
          "RATE_LIMIT",
        );
      case 500:
        return new APIError(
          data.message || "Internal server error",
          500,
          "SERVER_ERROR",
        );
      default:
        return new APIError(
          data.message || "Unknown server error",
          status,
          "UNKNOWN_ERROR",
        );
    }
  }

  handleNetworkError(error) {
    return new NetworkError("Network error occurred", error);
  }

  handleUnknownError(error) {
    return new APIError(
      error.message || "Unknown error occurred",
      0,
      "UNKNOWN_ERROR",
    );
  }
}
```

### Retry Mechanisms

**Exponential Backoff Retry**

```javascript
class RetryManager {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 10000;
    this.retryableStatusCodes = options.retryableStatusCodes || [
      408, 429, 500, 502, 503, 504,
    ];
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries || !this.shouldRetry(error)) {
          break;
        }

        const delay = this.calculateDelay(attempt);
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  shouldRetry(error) {
    return false;
  }

  calculateDelay(attempt) {
    return 0;
  }

  sleep(ms) {
    return Promise.resolve();
  }
}
```

## Performance Optimization

### Request Batching

**Batch Request Manager**

```javascript
class BatchRequestManager {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.pendingRequests = new Map();
    this.batchTimeout = 100; // 100ms
  }

  async batchRequest(endpoint, data, options = {}) {
    const batchKey = this.generateBatchKey(endpoint, options);

    if (!this.pendingRequests.has(batchKey)) {
      this.pendingRequests.set(batchKey, []);
    }

    const request = {
      data: data,
      resolve: null,
      reject: null,
      timestamp: Date.now(),
    };

    const promise = new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
    });

    this.pendingRequests.get(batchKey).push(request);

    // Process batch after timeout
    setTimeout(() => this.processBatch(batchKey), this.batchTimeout);

    return promise;
  }

  async processBatch(batchKey) {
    const requests = this.pendingRequests.get(batchKey);
    if (!requests || requests.length === 0) return;

    this.pendingRequests.delete(batchKey);

    try {
      const [serviceName, endpoint] = batchKey.split(":");
      const batchData = requests.map((req) => req.data);

      const response = await this.apiClient.post(`/${endpoint}/batch`, {
        requests: batchData,
      });

      requests.forEach((request, index) => {
        if (response.data.results[index].success) {
          request.resolve(response.data.results[index].data);
        } else {
          request.reject(new Error(response.data.results[index].error));
        }
      });
    } catch (error) {
      requests.forEach((request) => {
        request.reject(error);
      });
    }
  }
}
```
