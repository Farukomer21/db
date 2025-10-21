# SERVICE INTEGRATION GUIDE

## Db Admin Panel

This document provides detailed information about how the Db Admin Panel integrates with backend services, including configuration, API communication patterns, and service-specific implementation details.

## Architectural Design Credit and Contact Information

The architectural design of this service integration is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this service integration.

## Documentation Scope

This guide covers the complete integration architecture between the Db Admin Panel and its backend services. It includes configuration management, API communication patterns, authentication flows, and service-specific implementation details.

**Intended Audience**

This documentation is intended for frontend developers, DevOps engineers, and system integrators who need to understand, configure, or extend the admin panel's service integration capabilities.

## Service Integration Architecture

### Overview

The admin panel integrates with backend services through service-specific HTTP clients. Each service is configured via environment variables and uses its own Axios instance for API communication.

### Integration Components

**Service Configuration**

- Service URLs configured via environment variables
- Service-specific Axios instances for API communication

**API Communication**

- Basic HTTP client instances per service
- Simple error handling through response interceptors

## Service Configuration

### Environment Variables

The admin panel uses environment variables to configure service endpoints and integration settings:

**Core Configuration**

```bash
# Application Configuration
VITE_APP_NAME="Db Admin Panel"
VITE_APP_VERSION="1.0.38"
VITE_ASSETS_DIR="/assets"

# Authentication Configuration
VITE_AUTH_SKIP=false
VITE_AUTH_REDIRECT_PATH="/panel/dashboard"
```

**Service Endpoints**

````bash
# GuestManagement Service
VITE_GUESTMANAGEMENT_SERVICE_URL="https://guestManagement-api.db.prod.mindbricks.com"

```bash
# RoomInventory Service
VITE_ROOMINVENTORY_SERVICE_URL="https://roomInventory-api.db.prod.mindbricks.com"

```bash
# ReservationManagement Service
VITE_RESERVATIONMANAGEMENT_SERVICE_URL="https://reservationManagement-api.db.prod.mindbricks.com"

```bash
# PackageManagement Service
VITE_PACKAGEMANAGEMENT_SERVICE_URL="https://packageManagement-api.db.prod.mindbricks.com"

```bash
# PackageReservationMapping Service
VITE_PACKAGERESERVATIONMAPPING_SERVICE_URL="https://packageReservationMapping-api.db.prod.mindbricks.com"

```bash
# SpecialRequestManagement Service
VITE_SPECIALREQUESTMANAGEMENT_SERVICE_URL="https://specialRequestManagement-api.db.prod.mindbricks.com"

```bash
# PaymentManagement Service
VITE_PAYMENTMANAGEMENT_SERVICE_URL="https://paymentManagement-api.db.prod.mindbricks.com"

```bash
# RoomPricing Service
VITE_ROOMPRICING_SERVICE_URL="https://roomPricing-api.db.prod.mindbricks.com"

```bash
# FeedbackManagement Service
VITE_FEEDBACKMANAGEMENT_SERVICE_URL="https://feedbackManagement-api.db.prod.mindbricks.com"

```bash
# PersonnelManagement Service
VITE_PERSONNELMANAGEMENT_SERVICE_URL="https://personnelManagement-api.db.prod.mindbricks.com"

```bash
# Auth Service
VITE_AUTH_SERVICE_URL="https://auth-api.db.prod.mindbricks.com"

````

## API Communication Patterns

### HTTP Client Configuration

**Service-Specific Axios Instances**

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

### Service Endpoints

**GuestManagement Service Endpoints**

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

**RoomInventory Service Endpoints**

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

**ReservationManagement Service Endpoints**

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

**PackageManagement Service Endpoints**

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

**PackageReservationMapping Service Endpoints**

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

**SpecialRequestManagement Service Endpoints**

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

**PaymentManagement Service Endpoints**

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

**RoomPricing Service Endpoints**

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

**FeedbackManagement Service Endpoints**

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

**PersonnelManagement Service Endpoints**

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

**Auth Service Endpoints**

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

## Authentication Integration

### JWT Token Management

**Basic Token Handling**

```javascript
// Authentication is handled through the AuthProvider context
// Tokens are managed by the JWT authentication system
```

### Multi-Service Authentication

**Service Authentication Implementation**

```javascript
// Basic JWT authentication is used across all services
// Authentication context is shared between services
```

## Data Synchronization

### Real-Time Updates

**Data Synchronization Implementation**

```javascript
// Data is fetched on-demand through API calls
// No real-time synchronization is required
```

### Optimistic Updates

**Update Strategy Implementation**

```javascript
// Data is updated directly through API calls
// Changes are reflected immediately after successful API response
```

## Error Handling and Resilience

### Error Handling

**Error Handling Implementation**

```javascript
// Basic error handling through Axios response interceptors
// Errors are logged and simplified for display
```

### Retry Mechanisms

**Retry Implementation**

```javascript
// Basic error handling through Axios interceptors
// Errors are logged and displayed to users
```

## Service-Specific Integration Details

### GuestManagement Service Integration

**Service Overview**

- **Service Name**: `guestManagement`
- **Display Name**: `GuestManagement`
- **Primary Purpose**: Manages guest profiles and operational data for the single hotel. Supports full staff CRUD on guest records for operations and compliance.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Guest**: Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_GUESTMANAGEMENT_SERVICE_URL=https://guestManagement-api.db.prod.mindbricks.com
```

### RoomInventory Service Integration

**Service Overview**

- **Service Name**: `roomInventory`
- **Display Name**: `RoomInventory`
- **Primary Purpose**: Maintains the room inventory of the single hotel, supporting CRUD for staff and public room search for guest reservation workflow.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Room**: Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_ROOMINVENTORY_SERVICE_URL=https://roomInventory-api.db.prod.mindbricks.com
```

### ReservationManagement Service Integration

**Service Overview**

- **Service Name**: `reservationManagement`
- **Display Name**: `ReservationManagement`
- **Primary Purpose**: Handles hotel reservation workflow for guests and staff, using secure reservation codes for guest self-service and cross-referencing guest, room, payment, package, and special request data.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Reservation**: Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_RESERVATIONMANAGEMENT_SERVICE_URL=https://reservationManagement-api.db.prod.mindbricks.com
```

### PackageManagement Service Integration

**Service Overview**

- **Service Name**: `packageManagement`
- **Display Name**: `PackageManagement`
- **Primary Purpose**: Maintains the catalog of packages and extras available for reservations (e.g., breakfast included, spa access). Staff CRUD only.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Package\_**: Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_PACKAGEMANAGEMENT_SERVICE_URL=https://packageManagement-api.db.prod.mindbricks.com
```

### PackageReservationMapping Service Integration

**Service Overview**

- **Service Name**: `packageReservationMapping`
- **Display Name**: `PackageReservationMapping`
- **Primary Purpose**: Handles mappings between hotel reservations and selected packages/extras. Provides CRUD for staff to associate, update, or remove package associations on reservations. Enforces (reservationId, packageId) uniqueness per mapping. No guest/self-service APIs.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **PackageReservation**: Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_PACKAGERESERVATIONMAPPING_SERVICE_URL=https://packageReservationMapping-api.db.prod.mindbricks.com
```

### SpecialRequestManagement Service Integration

**Service Overview**

- **Service Name**: `specialRequestManagement`
- **Display Name**: `SpecialRequestManagement`
- **Primary Purpose**: Handles special requests raised by hotel guests and staff, enabling CRUD operations on special guest requests linked to reservations. Both public guest (via reservation code) and staff operations are supported. Includes workflow for request creation, fulfillment, cancellation, and staff response.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **SpecialRequest**: Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_SPECIALREQUESTMANAGEMENT_SERVICE_URL=https://specialRequestManagement-api.db.prod.mindbricks.com
```

### PaymentManagement Service Integration

**Service Overview**

- **Service Name**: `paymentManagement`
- **Display Name**: `PaymentManagement`
- **Primary Purpose**: Tracks all payment records for reservations, handled via redirection to external gateway (no embedded payment processing). Records payment status, method, and reference details for auditing. Associates payments with reservations for reconciliation.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Payment**: Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_PAYMENTMANAGEMENT_SERVICE_URL=https://paymentManagement-api.db.prod.mindbricks.com
```

### RoomPricing Service Integration

**Service Overview**

- **Service Name**: `roomPricing`
- **Display Name**: `RoomPricing`
- **Primary Purpose**: Maintains historical and current room pricing data per room; supports CRUD for pricing records, date ranges, and promotional types. Provides price lookup for reservation and availability workflows.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **RoomPrice**: Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_ROOMPRICING_SERVICE_URL=https://roomPricing-api.db.prod.mindbricks.com
```

### FeedbackManagement Service Integration

**Service Overview**

- **Service Name**: `feedbackManagement`
- **Display Name**: `FeedbackManagement`
- **Primary Purpose**: Collects, stores, and manages feedback submitted by guests after stay completion. Enables staff to review, moderate, and delete feedback for quality control.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Feedback**: Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_FEEDBACKMANAGEMENT_SERVICE_URL=https://feedbackManagement-api.db.prod.mindbricks.com
```

### PersonnelManagement Service Integration

**Service Overview**

- **Service Name**: `personnelManagement`
- **Display Name**: `PersonnelManagement`
- **Primary Purpose**: Manages routine CRUD operations for hotel staff/personnel records needed for operational management—not auth or sensitive HR—serving a single hotel context.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Personnel**: Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_PERSONNELMANAGEMENT_SERVICE_URL=https://personnelManagement-api.db.prod.mindbricks.com
```

### Auth Service Integration

**Service Overview**

- **Service Name**: `auth`
- **Display Name**: `Auth`
- **Primary Purpose**: Authentication service for the project

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **User**: A data object that stores the user information and handles login settings.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_AUTH_SERVICE_URL=https://auth-api.db.prod.mindbricks.com
```

## Performance Optimization

### Caching Strategies

**Caching Implementation**

```javascript
// Data is fetched on-demand through API calls
// No caching is required for current use cases
```

### Request Batching

**Request Batching Implementation**

```javascript
// Individual API calls are made as needed
// Each operation is handled independently
```

## Monitoring and Logging

### Service Monitoring

**Monitoring Implementation**

```javascript
// Basic error logging through console.error
// Service health is monitored through API responses
```

### Error Logging

**Error Logging Implementation**

```javascript
// Basic error logging through console.error
// Errors are displayed to users through UI components
```
