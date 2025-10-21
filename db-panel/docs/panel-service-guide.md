# PANEL SERVICE GUIDE

## Db Admin Panel

The Db Admin Panel is a dynamic, auto-generated frontend application that provides a comprehensive management interface for all backend services and data objects within the Db ecosystem. Built using React and Vite, it automatically adapts to the project's service architecture, providing intuitive CRUD operations and real-time data management capabilities.

## Architectural Design Credit and Contact Information

The architectural design of this admin panel is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this admin panel.

## Documentation Scope

Welcome to the official documentation for the Db Admin Panel. This document is designed to provide a comprehensive guide to understanding, configuring, and extending the admin panel's functionality.

**Intended Audience**

This documentation is intended for frontend developers, system administrators, and integrators who need to understand how the admin panel works, how to configure it for different environments, and how to extend its functionality for custom requirements.

**Overview**

Within these pages, you will find detailed information on the panel's architecture, service integration patterns, authentication flows, data object management, and API integration methods. The admin panel serves as a unified interface for managing all aspects of the Db microservices ecosystem.

## Panel Architecture Overview

The Db Admin Panel is built on a dynamic, pattern-driven architecture that automatically generates user interfaces based on the project's service definitions and data object schemas.

### Core Components

**Dynamic Service Integration**

- Automatically discovers and integrates with all backend services defined in the project
- Generates service-specific navigation and routing structures
- Provides unified authentication and session management across all services

**Data Object Management**

- Dynamically creates CRUD interfaces for each data object within services
- Supports complex data relationships and validation rules
- Provides real-time data synchronization with backend services

**Modular UI Framework**

- Built on React with Material-UI components for consistent user experience
- Responsive design that works across desktop and mobile devices
- Extensible component system for custom functionality

### Service Integration Architecture

The admin panel integrates with backend services through a standardized API communication layer:

**GuestManagement Service Integration**

- **Service Name**: `guestManagement`
- **Service URL**: `VITE_GUESTMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Guest

**RoomInventory Service Integration**

- **Service Name**: `roomInventory`
- **Service URL**: `VITE_ROOMINVENTORY_SERVICE_URL`
- **Data Objects**: 1 objects
  - Room

**ReservationManagement Service Integration**

- **Service Name**: `reservationManagement`
- **Service URL**: `VITE_RESERVATIONMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Reservation

**PackageManagement Service Integration**

- **Service Name**: `packageManagement`
- **Service URL**: `VITE_PACKAGEMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Package\_

**PackageReservationMapping Service Integration**

- **Service Name**: `packageReservationMapping`
- **Service URL**: `VITE_PACKAGERESERVATIONMAPPING_SERVICE_URL`
- **Data Objects**: 1 objects
  - PackageReservation

**SpecialRequestManagement Service Integration**

- **Service Name**: `specialRequestManagement`
- **Service URL**: `VITE_SPECIALREQUESTMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - SpecialRequest

**PaymentManagement Service Integration**

- **Service Name**: `paymentManagement`
- **Service URL**: `VITE_PAYMENTMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Payment

**RoomPricing Service Integration**

- **Service Name**: `roomPricing`
- **Service URL**: `VITE_ROOMPRICING_SERVICE_URL`
- **Data Objects**: 1 objects
  - RoomPrice

**FeedbackManagement Service Integration**

- **Service Name**: `feedbackManagement`
- **Service URL**: `VITE_FEEDBACKMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Feedback

**PersonnelManagement Service Integration**

- **Service Name**: `personnelManagement`
- **Service URL**: `VITE_PERSONNELMANAGEMENT_SERVICE_URL`
- **Data Objects**: 1 objects
  - Personnel

**Auth Service Integration**

- **Service Name**: `auth`
- **Service URL**: `VITE_AUTH_SERVICE_URL`
- **Data Objects**: 1 objects
  - User

## Authentication and Authorization

The admin panel implements a comprehensive authentication system that integrates with the project's authentication service.

### Authentication Flow

**Login Process**

1. User accesses the admin panel login page
2. Credentials are validated against the authentication service
3. JWT access token is received and stored securely
4. Session is established with proper permissions and tenant context

**Token Management**

- Access tokens are stored in secure HTTP-only cookies
- Automatic token refresh mechanisms prevent session expiration
- Multi-tenant support with tenant-specific token handling

### Authorization Levels

**Role-Based Access Control**

- Admin users have full access to all services and data objects
- Service-specific permissions control access to individual modules
- Data object permissions control CRUD operations on specific entities

**Permission Structure**

- `adminPanel.access` - Basic admin panel access

- `db.guestManagement.manage` - Service management permissions

- `db.guestManagement.guest.crud` - Data object CRUD permissions

- `db.roomInventory.manage` - Service management permissions

- `db.roomInventory.room.crud` - Data object CRUD permissions

- `db.reservationManagement.manage` - Service management permissions

- `db.reservationManagement.reservation.crud` - Data object CRUD permissions

- `db.packageManagement.manage` - Service management permissions

- `db.packageManagement.package_.crud` - Data object CRUD permissions

- `db.packageReservationMapping.manage` - Service management permissions

- `db.packageReservationMapping.packageReservation.crud` - Data object CRUD permissions

- `db.specialRequestManagement.manage` - Service management permissions

- `db.specialRequestManagement.specialRequest.crud` - Data object CRUD permissions

- `db.paymentManagement.manage` - Service management permissions

- `db.paymentManagement.payment.crud` - Data object CRUD permissions

- `db.roomPricing.manage` - Service management permissions

- `db.roomPricing.roomPrice.crud` - Data object CRUD permissions

- `db.feedbackManagement.manage` - Service management permissions

- `db.feedbackManagement.feedback.crud` - Data object CRUD permissions

- `db.personnelManagement.manage` - Service management permissions

- `db.personnelManagement.personnel.crud` - Data object CRUD permissions

- `db.auth.manage` - Service management permissions

- `db.auth.user.crud` - Data object CRUD permissions

## Service Integration Guide

### Environment Configuration

The admin panel connects to backend services through environment-specific configuration:

**Development Environment**

```javascript
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_USER_SERVICE_URL=http://localhost:3002
VITE_PRODUCT_SERVICE_URL=http://localhost:3003
```

**Staging Environment**

```javascript
VITE_AUTH_SERVICE_URL=https://auth-api.db.staging.mindbricks.com
VITE_USER_SERVICE_URL=https://user-api.db.staging.mindbricks.com
VITE_PRODUCT_SERVICE_URL=https://product-api.db.staging.mindbricks.com
```

**Production Environment**

```javascript
VITE_AUTH_SERVICE_URL=https://auth-api.db.prod.mindbricks.com
VITE_USER_SERVICE_URL=https://user-api.db.prod.mindbricks.com
VITE_PRODUCT_SERVICE_URL=https://product-api.db.prod.mindbricks.com
```

### API Communication Layer

**Axios Configuration**

```javascript
// Base configuration for all service communications
const apiClient = axios.create({
  baseURL: serviceUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
```

**Request Interceptors**

- Automatic token attachment to all requests
- Error handling and retry logic for failed requests
- Request/response logging for debugging

**Response Interceptors**

- Automatic token refresh on 401 responses
- Error message standardization
- Loading state management

## Data Object Management

### Dynamic CRUD Interface Generation

The admin panel automatically generates complete CRUD interfaces for each data object based on the service definitions:

**GuestManagement Service Data Objects**

**Guest Management**

- **Object Name**: `guest`
- **Component Name**: `GuestManagementGuestAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/guestManagement/guest`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new guest records
- Update Modal: Form for editing existing guest records
- Delete Confirmation: Safe deletion with confirmation dialogs

**RoomInventory Service Data Objects**

**Room Management**

- **Object Name**: `room`
- **Component Name**: `RoomInventoryRoomAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/roomInventory/room`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new room records
- Update Modal: Form for editing existing room records
- Delete Confirmation: Safe deletion with confirmation dialogs

**ReservationManagement Service Data Objects**

**Reservation Management**

- **Object Name**: `reservation`
- **Component Name**: `ReservationManagementReservationAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/reservationManagement/reservation`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new reservation records
- Update Modal: Form for editing existing reservation records
- Delete Confirmation: Safe deletion with confirmation dialogs

**PackageManagement Service Data Objects**

**Package\_ Management**

- **Object Name**: `package_`
- **Component Name**: `PackageManagementPackage_AppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/packageManagement/package_`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new package\_ records
- Update Modal: Form for editing existing package\_ records
- Delete Confirmation: Safe deletion with confirmation dialogs

**PackageReservationMapping Service Data Objects**

**PackageReservation Management**

- **Object Name**: `packageReservation`
- **Component Name**: `PackageReservationMappingPackageReservationAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/packageReservationMapping/packageReservation`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new packageReservation records
- Update Modal: Form for editing existing packageReservation records
- Delete Confirmation: Safe deletion with confirmation dialogs

**SpecialRequestManagement Service Data Objects**

**SpecialRequest Management**

- **Object Name**: `specialRequest`
- **Component Name**: `SpecialRequestManagementSpecialRequestAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/specialRequestManagement/specialRequest`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new specialRequest records
- Update Modal: Form for editing existing specialRequest records
- Delete Confirmation: Safe deletion with confirmation dialogs

**PaymentManagement Service Data Objects**

**Payment Management**

- **Object Name**: `payment`
- **Component Name**: `PaymentManagementPaymentAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/paymentManagement/payment`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new payment records
- Update Modal: Form for editing existing payment records
- Delete Confirmation: Safe deletion with confirmation dialogs

**RoomPricing Service Data Objects**

**RoomPrice Management**

- **Object Name**: `roomPrice`
- **Component Name**: `RoomPricingRoomPriceAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/roomPricing/roomPrice`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new roomPrice records
- Update Modal: Form for editing existing roomPrice records
- Delete Confirmation: Safe deletion with confirmation dialogs

**FeedbackManagement Service Data Objects**

**Feedback Management**

- **Object Name**: `feedback`
- **Component Name**: `FeedbackManagementFeedbackAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/feedbackManagement/feedback`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new feedback records
- Update Modal: Form for editing existing feedback records
- Delete Confirmation: Safe deletion with confirmation dialogs

**PersonnelManagement Service Data Objects**

**Personnel Management**

- **Object Name**: `personnel`
- **Component Name**: `PersonnelManagementPersonnelAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/personnelManagement/personnel`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new personnel records
- Update Modal: Form for editing existing personnel records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Auth Service Data Objects**

**User Management**

- **Object Name**: `user`
- **Component Name**: `AuthUserAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/auth/user`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new user records
- Update Modal: Form for editing existing user records
- Delete Confirmation: Safe deletion with confirmation dialogs

### Data Validation and Error Handling

**Client-Side Validation**

- Real-time validation based on data object property definitions
- Type checking and format validation
- Required field validation

**Server-Side Integration**

- API error response handling
- Validation error display
- Success/error notification system

## API Integration Patterns

### Standard CRUD Operations

**List Operations**

```javascript
// Get paginated list of data objects
const response = await apiClient.get(`/${dataObjectName}/list`, {
  params: {
    pageNumber: 1,
    pageRowCount: 25,
    getJoins: true,
    caching: true,
  },
});
```

**Create Operations**

```javascript
// Create new data object
const response = await apiClient.post(`/${dataObjectName}/create`, {
  // Data object properties
});
```

**Update Operations**

```javascript
// Update existing data object
const response = await apiClient.put(`/${dataObjectName}/update`, {
  id: objectId,
  // Updated properties
});
```

**Delete Operations**

```javascript
// Delete data object
const response = await apiClient.delete(`/${dataObjectName}/delete`, {
  params: { id: objectId },
});
```

### Advanced Query Features

**Filtering and Search**

- Dynamic filter generation based on data object properties
- Full-text search capabilities
- Date range filtering
- Multi-select filters for enum properties

**Sorting and Pagination**

- Multi-column sorting support
- Configurable page sizes
- Total count and page navigation
- Infinite scroll option

**Data Relationships**

- Automatic join handling for related data objects
- Lazy loading for performance optimization
- Relationship visualization in forms

## Navigation and Routing

### Dynamic Route Generation

The admin panel automatically generates routes based on the service and data object structure:

**Main Routes**

- `/` - Login page
- `/dashboard` - Main dashboard

- `/dashboard/guestManagement` - Service overview

- `/dashboard/guestManagement/guest` - Data object management

- `/dashboard/roomInventory` - Service overview

- `/dashboard/roomInventory/room` - Data object management

- `/dashboard/reservationManagement` - Service overview

- `/dashboard/reservationManagement/reservation` - Data object management

- `/dashboard/packageManagement` - Service overview

- `/dashboard/packageManagement/package_` - Data object management

- `/dashboard/packageReservationMapping` - Service overview

- `/dashboard/packageReservationMapping/packageReservation` - Data object management

- `/dashboard/specialRequestManagement` - Service overview

- `/dashboard/specialRequestManagement/specialRequest` - Data object management

- `/dashboard/paymentManagement` - Service overview

- `/dashboard/paymentManagement/payment` - Data object management

- `/dashboard/roomPricing` - Service overview

- `/dashboard/roomPricing/roomPrice` - Data object management

- `/dashboard/feedbackManagement` - Service overview

- `/dashboard/feedbackManagement/feedback` - Data object management

- `/dashboard/personnelManagement` - Service overview

- `/dashboard/personnelManagement/personnel` - Data object management

- `/dashboard/auth` - Service overview

- `/dashboard/auth/user` - Data object management

**Route Configuration**

```javascript
// Automatically generated route structure
const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "guestManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "guest",
            element: <GuestManagementGuestAppPage />,
          },
        ],
      },

      {
        path: "roomInventory",
        element: <DataObjectLayout />,
        children: [
          {
            path: "room",
            element: <RoomInventoryRoomAppPage />,
          },
        ],
      },

      {
        path: "reservationManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "reservation",
            element: <ReservationManagementReservationAppPage />,
          },
        ],
      },

      {
        path: "packageManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "package_",
            element: <PackageManagementPackage_AppPage />,
          },
        ],
      },

      {
        path: "packageReservationMapping",
        element: <DataObjectLayout />,
        children: [
          {
            path: "packageReservation",
            element: <PackageReservationMappingPackageReservationAppPage />,
          },
        ],
      },

      {
        path: "specialRequestManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "specialRequest",
            element: <SpecialRequestManagementSpecialRequestAppPage />,
          },
        ],
      },

      {
        path: "paymentManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "payment",
            element: <PaymentManagementPaymentAppPage />,
          },
        ],
      },

      {
        path: "roomPricing",
        element: <DataObjectLayout />,
        children: [
          {
            path: "roomPrice",
            element: <RoomPricingRoomPriceAppPage />,
          },
        ],
      },

      {
        path: "feedbackManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "feedback",
            element: <FeedbackManagementFeedbackAppPage />,
          },
        ],
      },

      {
        path: "personnelManagement",
        element: <DataObjectLayout />,
        children: [
          {
            path: "personnel",
            element: <PersonnelManagementPersonnelAppPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <DataObjectLayout />,
        children: [
          {
            path: "user",
            element: <AuthUserAppPage />,
          },
        ],
      },
    ],
  },
];
```

### Navigation Structure

**Main Navigation**

- Dashboard overview
- Service modules (dynamically generated)
- User profile and settings
- Logout functionality

**Service Navigation**

- Service-specific data object management
- Service configuration and settings
- Service health and monitoring

## Error Handling and User Experience

### Error Management System

**API Error Handling**

- Standardized error response processing
- User-friendly error message display
- Automatic retry mechanisms for transient failures
- Offline detection and handling

**Validation Error Display**

- Field-specific error highlighting
- Inline error messages
- Form validation summary

**Loading States**

- Skeleton loading for data tables
- Progress indicators for long operations
- Optimistic updates for better UX

### Notification System

**Success Notifications**

- Operation completion confirmations
- Data synchronization status
- System health updates

**Error Notifications**

- API error alerts
- Validation error summaries
- Network connectivity issues

**Warning Notifications**

- Data loss prevention warnings
- Permission change alerts
- System maintenance notifications

## Deployment and Configuration

### Build Configuration

**Environment-Specific Builds**

- Development builds with debugging enabled
- Staging builds with production-like settings
- Production builds with optimization and minification

**Docker Support**

- Multi-stage Docker builds for different environments
- Environment variable injection
- Health check endpoints

### Performance Optimization

**Code Splitting**

- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

**Caching Strategies**

- API response caching
- Static asset caching
- Browser cache optimization

**Bundle Optimization**

- Tree shaking for unused code
- Asset compression
- CDN integration support

## Security Considerations

### Authentication Security

- Secure token storage and transmission
- Automatic token refresh
- Session timeout handling
- Multi-factor authentication support

### Data Protection

- Input sanitization and validation
- XSS prevention
- CSRF protection
- Secure API communication

### Access Control

- Role-based permission enforcement
- Tenant isolation in multi-tenant setups
- Audit logging for sensitive operations
- Secure logout and session cleanup

## Troubleshooting and Support

### Common Issues

**Authentication Problems**

- Token expiration handling
- Session restoration after page refresh
- Multi-tenant login issues

**API Integration Issues**

- Service connectivity problems
- Data synchronization errors
- Permission-related access denials

**UI/UX Issues**

- Component rendering problems
- Navigation routing issues
- Form validation errors

### Debugging Tools

**Development Tools**

- React Developer Tools integration
- Network request monitoring
- State management debugging
- Performance profiling

**Logging and Monitoring**

- Client-side error logging
- API request/response logging
- User interaction tracking
- Performance metrics collection
