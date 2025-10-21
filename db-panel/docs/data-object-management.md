# DATA OBJECT MANAGEMENT

## Db Admin Panel

This document provides comprehensive information about how the Db Admin Panel manages data objects, including CRUD operations, validation, relationships, and user interface generation.

## Architectural Design Credit and Contact Information

The architectural design of this data object management system is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this data object management system.

## Documentation Scope

This guide covers the complete data object management system within the Db Admin Panel. It includes dynamic UI generation, CRUD operations, data validation, relationship management, and user experience patterns.

**Intended Audience**

This documentation is intended for frontend developers, UI/UX designers, and system administrators who need to understand how data objects are managed, displayed, and manipulated within the admin panel.

## Data Object Architecture

### Overview

The admin panel implements a basic data object management system that generates simple CRUD interfaces for data objects defined in the backend services. Each data object is represented by a data grid for listing and basic modal components for create/update/delete operations.

### Data Object Structure

**Core Data Object Properties**

- **Name**: Unique identifier for the data object
- **Display Name**: Human-readable name for UI display
- **Component Name**: React component name for rendering
- **Properties**: Array of data object properties with types

### Dynamic UI Generation

**Component Generation Pattern**

```javascript
// Data object component structure GuestManagement guest
const DataObjectComponentGuestManagementGuest = {
  // List view for displaying multiple records
  ListView: {
    component: "GuestManagementGuestAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "GuestManagementGuestAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "GuestManagementGuestAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "GuestManagementGuestAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure RoomInventory room
const DataObjectComponentRoomInventoryRoom = {
  // List view for displaying multiple records
  ListView: {
    component: "RoomInventoryRoomAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "RoomInventoryRoomAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "RoomInventoryRoomAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "RoomInventoryRoomAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure ReservationManagement reservation
const DataObjectComponentReservationManagementReservation = {
  // List view for displaying multiple records
  ListView: {
    component: "ReservationManagementReservationAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "ReservationManagementReservationAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "ReservationManagementReservationAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "ReservationManagementReservationAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure PackageManagement package_
const DataObjectComponentPackageManagementPackage_ = {
  // List view for displaying multiple records
  ListView: {
    component: "PackageManagementPackage_AppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "PackageManagementPackage_AppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "PackageManagementPackage_AppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "PackageManagementPackage_AppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure PackageReservationMapping packageReservation
const DataObjectComponentPackageReservationMappingPackageReservation = {
  // List view for displaying multiple records
  ListView: {
    component: "PackageReservationMappingPackageReservationAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "PackageReservationMappingPackageReservationAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "PackageReservationMappingPackageReservationAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "PackageReservationMappingPackageReservationAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure SpecialRequestManagement specialRequest
const DataObjectComponentSpecialRequestManagementSpecialRequest = {
  // List view for displaying multiple records
  ListView: {
    component: "SpecialRequestManagementSpecialRequestAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "SpecialRequestManagementSpecialRequestAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "SpecialRequestManagementSpecialRequestAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "SpecialRequestManagementSpecialRequestAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure PaymentManagement payment
const DataObjectComponentPaymentManagementPayment = {
  // List view for displaying multiple records
  ListView: {
    component: "PaymentManagementPaymentAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "PaymentManagementPaymentAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "PaymentManagementPaymentAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "PaymentManagementPaymentAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure RoomPricing roomPrice
const DataObjectComponentRoomPricingRoomPrice = {
  // List view for displaying multiple records
  ListView: {
    component: "RoomPricingRoomPriceAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "RoomPricingRoomPriceAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "RoomPricingRoomPriceAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "RoomPricingRoomPriceAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure FeedbackManagement feedback
const DataObjectComponentFeedbackManagementFeedback = {
  // List view for displaying multiple records
  ListView: {
    component: "FeedbackManagementFeedbackAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "FeedbackManagementFeedbackAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "FeedbackManagementFeedbackAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "FeedbackManagementFeedbackAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure PersonnelManagement personnel
const DataObjectComponentPersonnelManagementPersonnel = {
  // List view for displaying multiple records
  ListView: {
    component: "PersonnelManagementPersonnelAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "PersonnelManagementPersonnelAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "PersonnelManagementPersonnelAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "PersonnelManagementPersonnelAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Auth user
const DataObjectComponentAuthUser = {
  // List view for displaying multiple records
  ListView: {
    component: "AuthUserAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "AuthUserAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "AuthUserAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "AuthUserAppPageDeleteModal",
    lazy: true,
  },
};
```

## Service Data Objects

### GuestManagement Service Data Objects

**Service Overview**

- **Service Name**: `guestManagement`
- **Service Display Name**: `GuestManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Guest Data Object

**Basic Information**

- **Object Name**: `guest`
- **Display Name**: `Guest`
- **Component Name**: `GuestManagementGuestAppPage`
- **Description**: Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **fullname** | String | | N/A | _Full name of the guest._ |

| **email** | String | | N/A | _Guest&#39;s email address for contact or info purposes._ |

| **phoneNumber** | String | | N/A | _Guest&#39;s phone number, used for record or contact as needed._ |

| **address** | Text | | N/A | _Full postal address of the guest._ |

| **notes** | Text | | N/A | _Internal staff comments for the guest record (not exposed to guests)._ |

**Generated UI Components**

- **List Component**: `GuestManagementGuestAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `GuestManagementGuestAppPageCreateModal` - Form for creating new records
- **Update Modal**: `GuestManagementGuestAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `GuestManagementGuestAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /guest/list` - Retrieve paginated list of records
- **Get**: `GET /guest/get` - Retrieve single record by ID
- **Create**: `POST /guest/create` - Create new record
- **Update**: `PUT /guest/update` - Update existing record
- **Delete**: `DELETE /guest/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/guestManagement/guest`
- **Create Route**: `/dashboard/guestManagement/guest/create`
- **Update Route**: `/dashboard/guestManagement/guest/update/:id`
- **Delete Route**: `/dashboard/guestManagement/guest/delete/:id`

### RoomInventory Service Data Objects

**Service Overview**

- **Service Name**: `roomInventory`
- **Service Display Name**: `RoomInventory`
- **Total Data Objects**: 1

**Data Objects**

#### Room Data Object

**Basic Information**

- **Object Name**: `room`
- **Display Name**: `Room`
- **Component Name**: `RoomInventoryRoomAppPage`
- **Description**: Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **roomNumber** | String | | N/A | _Unique number or code for the room (e.g., 101, B12)._ |

| **floor** | Integer | | N/A | _Floor number where room is located._ |

| **type** | Enum | | N/A | _Room type (e.g., single, double, suite)._ |

| **capacity** | Integer | | N/A | _Maximum number of guests room can accommodate._ |

| **bedType** | String | | N/A | _Type of beds (e.g., queen, twin, king)._ |

| **amenities** | String | | N/A | _Array of amenity descriptions (e.g., Wi-Fi, TV, minibar)._ |

| **status** | Enum | | N/A | _Room status (available, occupied, under maintenance)._ |

| **description** | Text | | N/A | _Detailed textual description of the room._ |

| **images** | String | | N/A | _Image URLs for the room._ |

**Enum Properties**

##### type Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **single** | `"single"` | 0 |

| **double** | `"double"` | 1 |

| **suite** | `"suite"` | 2 |

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **available** | `"available"` | 0 |

| **occupied** | `"occupied"` | 1 |

| **under_maintenance** | `"under_maintenance"` | 2 |

**Generated UI Components**

- **List Component**: `RoomInventoryRoomAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `RoomInventoryRoomAppPageCreateModal` - Form for creating new records
- **Update Modal**: `RoomInventoryRoomAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `RoomInventoryRoomAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /room/list` - Retrieve paginated list of records
- **Get**: `GET /room/get` - Retrieve single record by ID
- **Create**: `POST /room/create` - Create new record
- **Update**: `PUT /room/update` - Update existing record
- **Delete**: `DELETE /room/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/roomInventory/room`
- **Create Route**: `/dashboard/roomInventory/room/create`
- **Update Route**: `/dashboard/roomInventory/room/update/:id`
- **Delete Route**: `/dashboard/roomInventory/room/delete/:id`

### ReservationManagement Service Data Objects

**Service Overview**

- **Service Name**: `reservationManagement`
- **Service Display Name**: `ReservationManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Reservation Data Object

**Basic Information**

- **Object Name**: `reservation`
- **Display Name**: `Reservation`
- **Component Name**: `ReservationManagementReservationAppPage`
- **Description**: Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **guestId** | ID | | N/A | _Reference to guest who made this reservation._ |

| **roomId** | ID | | N/A | _Reference to the hotel room for this reservation._ |

| **checkInDate** | Date | | N/A | _Check-in date for the reservation._ |

| **checkOutDate** | Date | | N/A | _Check-out date for the reservation._ |

| **reservationCode** | String | | N/A | _Unique, cryptographically secure reservation code for guest access. Null until payment is confirmed._ |

| **packages** | ID | | N/A | _Array of package IDs associated to this reservation (maps to packageReservationMapping)._ |

| **specialRequests** | ID | | N/A | _Array of specialRequest IDs associated with this reservation._ |

| **paymentId** | ID | | N/A | _Reference to the payment record for this reservation._ |

| **status** | Enum | | N/A | _Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay._ |

| **numGuests** | Integer | | N/A | _Number of guests for this reservation._ |

| **totalPrice** | Double | | N/A | _Total price for the reservation (rooms + packages)._ |

| **notes** | Text | | N/A | _Internal notes, only for staff eyes (not sent to guests/public)._ |

**Enum Properties**

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **pending** | `"pending"` | 0 |

| **confirmed** | `"confirmed"` | 1 |

| **canceled** | `"canceled"` | 2 |

| **completed** | `"completed"` | 3 |

**Generated UI Components**

- **List Component**: `ReservationManagementReservationAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `ReservationManagementReservationAppPageCreateModal` - Form for creating new records
- **Update Modal**: `ReservationManagementReservationAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `ReservationManagementReservationAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /reservation/list` - Retrieve paginated list of records
- **Get**: `GET /reservation/get` - Retrieve single record by ID
- **Create**: `POST /reservation/create` - Create new record
- **Update**: `PUT /reservation/update` - Update existing record
- **Delete**: `DELETE /reservation/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/reservationManagement/reservation`
- **Create Route**: `/dashboard/reservationManagement/reservation/create`
- **Update Route**: `/dashboard/reservationManagement/reservation/update/:id`
- **Delete Route**: `/dashboard/reservationManagement/reservation/delete/:id`

### PackageManagement Service Data Objects

**Service Overview**

- **Service Name**: `packageManagement`
- **Service Display Name**: `PackageManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Package\_ Data Object

**Basic Information**

- **Object Name**: `package_`
- **Display Name**: `Package_`
- **Component Name**: `PackageManagementPackage_AppPage`
- **Description**: Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **name** | String | | N/A | _Name of the package or extra service._ |

| **description** | String | | N/A | _Detailed description of the package/extra service._ |

| **price** | Double | | N/A | _Price for the package/extra, in hotel currency._ |

| **duration** | String | | N/A | _(Optional) How long the package/extra is valid (e.g., per day, per stay, etc.)._ |

| **conditions** | String | | N/A | _(Optional) Any conditions or rules attached to the package (e.g., must book 2 nights)._ |

**Generated UI Components**

- **List Component**: `PackageManagementPackage_AppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `PackageManagementPackage_AppPageCreateModal` - Form for creating new records
- **Update Modal**: `PackageManagementPackage_AppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `PackageManagementPackage_AppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /package_/list` - Retrieve paginated list of records
- **Get**: `GET /package_/get` - Retrieve single record by ID
- **Create**: `POST /package_/create` - Create new record
- **Update**: `PUT /package_/update` - Update existing record
- **Delete**: `DELETE /package_/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/packageManagement/package_`
- **Create Route**: `/dashboard/packageManagement/package_/create`
- **Update Route**: `/dashboard/packageManagement/package_/update/:id`
- **Delete Route**: `/dashboard/packageManagement/package_/delete/:id`

### PackageReservationMapping Service Data Objects

**Service Overview**

- **Service Name**: `packageReservationMapping`
- **Service Display Name**: `PackageReservationMapping`
- **Total Data Objects**: 1

**Data Objects**

#### PackageReservation Data Object

**Basic Information**

- **Object Name**: `packageReservation`
- **Display Name**: `PackageReservation`
- **Component Name**: `PackageReservationMappingPackageReservationAppPage`
- **Description**: Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **reservationId** | ID | | N/A | _Reference to the reservation that this package is linked to._ |

| **packageId** | ID | | N/A | _Reference to the package/extra selected for the reservation._ |

| **priceAtBooking** | Double | | N/A | _Unit price of the package at the time of booking. Used for historical pricing and audit._ |

| **notes** | String | | N/A | _Optional staff note about the package-reservation mapping._ |

**Generated UI Components**

- **List Component**: `PackageReservationMappingPackageReservationAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `PackageReservationMappingPackageReservationAppPageCreateModal` - Form for creating new records
- **Update Modal**: `PackageReservationMappingPackageReservationAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `PackageReservationMappingPackageReservationAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /packageReservation/list` - Retrieve paginated list of records
- **Get**: `GET /packageReservation/get` - Retrieve single record by ID
- **Create**: `POST /packageReservation/create` - Create new record
- **Update**: `PUT /packageReservation/update` - Update existing record
- **Delete**: `DELETE /packageReservation/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/packageReservationMapping/packageReservation`
- **Create Route**: `/dashboard/packageReservationMapping/packageReservation/create`
- **Update Route**: `/dashboard/packageReservationMapping/packageReservation/update/:id`
- **Delete Route**: `/dashboard/packageReservationMapping/packageReservation/delete/:id`

### SpecialRequestManagement Service Data Objects

**Service Overview**

- **Service Name**: `specialRequestManagement`
- **Service Display Name**: `SpecialRequestManagement`
- **Total Data Objects**: 1

**Data Objects**

#### SpecialRequest Data Object

**Basic Information**

- **Object Name**: `specialRequest`
- **Display Name**: `SpecialRequest`
- **Component Name**: `SpecialRequestManagementSpecialRequestAppPage`
- **Description**: Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **reservationId** | ID | | N/A | _Reference to the reservation for this special request._ |

| **guestId** | ID | | N/A | _ID of the guest who made this special request (redundant for tracing, resolved via reservation also)._ |

| **requestText** | String | | N/A | _Text description of the guest&#39;s special request._ |

| **status** | Enum | | N/A | _Current status of the special request (&#39;pending&#39;,&#39;fulfilled&#39;,&#39;canceled&#39;)._ |

| **response** | String | | N/A | _Staff action or response to the special request (free text)._ |

**Enum Properties**

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **pending** | `"pending"` | 0 |

| **fulfilled** | `"fulfilled"` | 1 |

| **canceled** | `"canceled"` | 2 |

**Generated UI Components**

- **List Component**: `SpecialRequestManagementSpecialRequestAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `SpecialRequestManagementSpecialRequestAppPageCreateModal` - Form for creating new records
- **Update Modal**: `SpecialRequestManagementSpecialRequestAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `SpecialRequestManagementSpecialRequestAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /specialRequest/list` - Retrieve paginated list of records
- **Get**: `GET /specialRequest/get` - Retrieve single record by ID
- **Create**: `POST /specialRequest/create` - Create new record
- **Update**: `PUT /specialRequest/update` - Update existing record
- **Delete**: `DELETE /specialRequest/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/specialRequestManagement/specialRequest`
- **Create Route**: `/dashboard/specialRequestManagement/specialRequest/create`
- **Update Route**: `/dashboard/specialRequestManagement/specialRequest/update/:id`
- **Delete Route**: `/dashboard/specialRequestManagement/specialRequest/delete/:id`

### PaymentManagement Service Data Objects

**Service Overview**

- **Service Name**: `paymentManagement`
- **Service Display Name**: `PaymentManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Payment Data Object

**Basic Information**

- **Object Name**: `payment`
- **Display Name**: `Payment`
- **Component Name**: `PaymentManagementPaymentAppPage`
- **Description**: Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **reservationId** | ID | | N/A | _Reference to the reservation for which this payment was made._ |

| **amount** | Double | | N/A | _Amount paid in this transaction (in hotel&#39;s default currency)._ |

| **paymentStatus** | Enum | | N/A | _Current status of the payment (pending, successful, failed, refunded)._ |

| **paymentMethod** | Enum | | N/A | _How the payment was attempted: external gateway, cash, or card (staff-side record)._ |

| **gatewayReference** | String | | N/A | _External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation._ |

| **processedAt** | Date | | N/A | _Date/time the payment was processed, confirmed, or failed._ |

**Enum Properties**

##### paymentStatus Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **pending** | `"pending"` | 0 |

| **successful** | `"successful"` | 1 |

| **failed** | `"failed"` | 2 |

| **refunded** | `"refunded"` | 3 |

##### paymentMethod Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **external_gateway** | `"external_gateway"` | 0 |

| **cash** | `"cash"` | 1 |

| **card** | `"card"` | 2 |

**Generated UI Components**

- **List Component**: `PaymentManagementPaymentAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `PaymentManagementPaymentAppPageCreateModal` - Form for creating new records
- **Update Modal**: `PaymentManagementPaymentAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `PaymentManagementPaymentAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /payment/list` - Retrieve paginated list of records
- **Get**: `GET /payment/get` - Retrieve single record by ID
- **Create**: `POST /payment/create` - Create new record
- **Update**: `PUT /payment/update` - Update existing record
- **Delete**: `DELETE /payment/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/paymentManagement/payment`
- **Create Route**: `/dashboard/paymentManagement/payment/create`
- **Update Route**: `/dashboard/paymentManagement/payment/update/:id`
- **Delete Route**: `/dashboard/paymentManagement/payment/delete/:id`

### RoomPricing Service Data Objects

**Service Overview**

- **Service Name**: `roomPricing`
- **Service Display Name**: `RoomPricing`
- **Total Data Objects**: 1

**Data Objects**

#### RoomPrice Data Object

**Basic Information**

- **Object Name**: `roomPrice`
- **Display Name**: `RoomPrice`
- **Component Name**: `RoomPricingRoomPriceAppPage`
- **Description**: Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **roomId** | ID | | N/A | _Reference to the room for which this price is applicable._ |

| **startDate** | Date | | N/A | _Start date from which this price is effective (inclusive)._ |

| **endDate** | Date | | N/A | _Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates._ |

| **price** | Double | | N/A | _Price value for this room and date range, in hotel currency._ |

| **priceType** | Enum | | N/A | _Price type: standard, promotional, or seasonal._ |

| **description** | String | | N/A | _Staff-facing description or note for this price entry._ |

**Enum Properties**

##### priceType Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **standard** | `"standard"` | 0 |

| **promotional** | `"promotional"` | 1 |

| **seasonal** | `"seasonal"` | 2 |

**Generated UI Components**

- **List Component**: `RoomPricingRoomPriceAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `RoomPricingRoomPriceAppPageCreateModal` - Form for creating new records
- **Update Modal**: `RoomPricingRoomPriceAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `RoomPricingRoomPriceAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /roomPrice/list` - Retrieve paginated list of records
- **Get**: `GET /roomPrice/get` - Retrieve single record by ID
- **Create**: `POST /roomPrice/create` - Create new record
- **Update**: `PUT /roomPrice/update` - Update existing record
- **Delete**: `DELETE /roomPrice/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/roomPricing/roomPrice`
- **Create Route**: `/dashboard/roomPricing/roomPrice/create`
- **Update Route**: `/dashboard/roomPricing/roomPrice/update/:id`
- **Delete Route**: `/dashboard/roomPricing/roomPrice/delete/:id`

### FeedbackManagement Service Data Objects

**Service Overview**

- **Service Name**: `feedbackManagement`
- **Service Display Name**: `FeedbackManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Feedback Data Object

**Basic Information**

- **Object Name**: `feedback`
- **Display Name**: `Feedback`
- **Component Name**: `FeedbackManagementFeedbackAppPage`
- **Description**: Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **reservationId** | ID | | N/A | _Reference to the reservation for which feedback is submitted. Used for traceability and eligibility check._ |

| **guestName** | String | | N/A | _Name of the guest submitting feedback (free text)._ |

| **rating** | Integer | | N/A | _Rating from 1 to 5 reflecting guest&#39;s satisfaction._ |

| **comment** | Text | | N/A | _Free-text feedback, comment on guest&#39;s experience._ |

| **submittedAt** | Date | | N/A | _Timestamp of when feedback was submitted. Automatically set on create._ |

**Generated UI Components**

- **List Component**: `FeedbackManagementFeedbackAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `FeedbackManagementFeedbackAppPageCreateModal` - Form for creating new records
- **Update Modal**: `FeedbackManagementFeedbackAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `FeedbackManagementFeedbackAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /feedback/list` - Retrieve paginated list of records
- **Get**: `GET /feedback/get` - Retrieve single record by ID
- **Create**: `POST /feedback/create` - Create new record
- **Update**: `PUT /feedback/update` - Update existing record
- **Delete**: `DELETE /feedback/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/feedbackManagement/feedback`
- **Create Route**: `/dashboard/feedbackManagement/feedback/create`
- **Update Route**: `/dashboard/feedbackManagement/feedback/update/:id`
- **Delete Route**: `/dashboard/feedbackManagement/feedback/delete/:id`

### PersonnelManagement Service Data Objects

**Service Overview**

- **Service Name**: `personnelManagement`
- **Service Display Name**: `PersonnelManagement`
- **Total Data Objects**: 1

**Data Objects**

#### Personnel Data Object

**Basic Information**

- **Object Name**: `personnel`
- **Display Name**: `Personnel`
- **Component Name**: `PersonnelManagementPersonnelAppPage`
- **Description**: Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **name** | String | | N/A | _Full name of the employee/staff member._ |

| **jobTitle** | String | | N/A | _Job title or operational role of this staff member (e.g., Housekeeper, Receptionist)._ |

| **department** | String | | N/A | _Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen)._ |

| **startDate** | Date | | N/A | _Date staff member started employment or became active at the hotel._ |

| **endDate** | Date | | N/A | _Date staff member left or ended employment (null if current)._ |

| **contactInfo** | String | | N/A | _Contact information for operational use (email, phone, or other). Not sensitive HR data._ |

| **notes** | String | | N/A | _Internal operational notes about the staff member (free text, not sensitive HR data). Optional._ |

**Generated UI Components**

- **List Component**: `PersonnelManagementPersonnelAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `PersonnelManagementPersonnelAppPageCreateModal` - Form for creating new records
- **Update Modal**: `PersonnelManagementPersonnelAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `PersonnelManagementPersonnelAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /personnel/list` - Retrieve paginated list of records
- **Get**: `GET /personnel/get` - Retrieve single record by ID
- **Create**: `POST /personnel/create` - Create new record
- **Update**: `PUT /personnel/update` - Update existing record
- **Delete**: `DELETE /personnel/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/personnelManagement/personnel`
- **Create Route**: `/dashboard/personnelManagement/personnel/create`
- **Update Route**: `/dashboard/personnelManagement/personnel/update/:id`
- **Delete Route**: `/dashboard/personnelManagement/personnel/delete/:id`

### Auth Service Data Objects

**Service Overview**

- **Service Name**: `auth`
- **Service Display Name**: `Auth`
- **Total Data Objects**: 1

**Data Objects**

#### User Data Object

**Basic Information**

- **Object Name**: `user`
- **Display Name**: `User`
- **Component Name**: `AuthUserAppPage`
- **Description**: A data object that stores the user information and handles login settings.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **email** | String | | N/A | _ A string value to represent the user&#39;s email._ |

| **password** | String | | N/A | _ A string value to represent the user&#39;s password. It will be stored as hashed._ |

| **fullname** | String | | N/A | _A string value to represent the fullname of the user_ |

| **avatar** | String | | N/A | _The avatar url of the user. A random avatar will be generated if not provided_ |

| **roleId** | String | | N/A | _A string value to represent the roleId of the user._ |

| **emailVerified** | Boolean | | N/A | _A boolean value to represent the email verification status of the user._ |

**Generated UI Components**

- **List Component**: `AuthUserAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `AuthUserAppPageCreateModal` - Form for creating new records
- **Update Modal**: `AuthUserAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `AuthUserAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /user/list` - Retrieve paginated list of records
- **Get**: `GET /user/get` - Retrieve single record by ID
- **Create**: `POST /user/create` - Create new record
- **Update**: `PUT /user/update` - Update existing record
- **Delete**: `DELETE /user/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/auth/user`
- **Create Route**: `/dashboard/auth/user/create`
- **Update Route**: `/dashboard/auth/user/update/:id`
- **Delete Route**: `/dashboard/auth/user/delete/:id`

## CRUD Operations

### Create Operations

**Create Form Implementation**

```javascript
// Create forms are generated as lazy-loaded modal components
// Basic form fields are rendered based on data object properties
```

**Create API Integration**

```javascript
// Create operations are handled through service-specific API calls
// Basic validation is performed client-side
```

### Read Operations

**List View Implementation**

```javascript
// List views are implemented using MUI DataGrid
// Data is fetched through service-specific API calls
```

### Update Operations

**Update Form Implementation**

```javascript
// Update forms are generated as lazy-loaded modal components
// Basic form fields are pre-populated with existing data
```

**Update API Integration**

```javascript
// Update operations are handled through service-specific API calls
// Basic validation is performed client-side
```

### Delete Operations

**Delete Implementation**

```javascript
// Delete operations are handled through service-specific API calls
// Confirmation dialogs are implemented as modal components
```

## Data Validation

### Client-Side Validation

**Validation Implementation**

```javascript
// Basic validation is performed on form fields
// Required fields are validated before submission
```

### Server-Side Validation Integration

**API Error Handling**

```javascript
// Server validation errors are displayed to users
// Error messages are shown in the UI components
```

## Data Relationships

### Relationship Management

**Relationship Implementation**

```javascript
// Basic data relationships are handled through form fields
// Related data is displayed in select components
```

## User Experience Patterns

### Loading States

**Loading Implementation**

```javascript
// Loading states are handled by MUI DataGrid
// Skeleton loading is provided by the data grid component
```

### Error States

**Error Handling UI**

```javascript
// Error states are displayed through UI components
// Error messages are shown to users
```

### Empty States

**Empty State UI**

```javascript
// Empty states are handled by MUI DataGrid
// Empty content is displayed when no data is available
```

## Performance Optimization

### Data Pagination

**Pagination Implementation**

```javascript
// Pagination is handled by MUI DataGrid
// Data is loaded in pages as needed
```
