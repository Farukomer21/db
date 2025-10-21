# Service Design Specification - Object Design for packageReservation

**db-packagereservationmapping-service** documentation

## Document Overview

This document outlines the object design for the `packageReservation` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## packageReservation Data Object

### Object Overview

**Description:** Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **reservation_package_unique**: [reservationId, packageId]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property         | Type   | Required | Description                                                                              |
| ---------------- | ------ | -------- | ---------------------------------------------------------------------------------------- |
| `reservationId`  | ID     | Yes      | Reference to the reservation that this package is linked to.                             |
| `packageId`      | ID     | Yes      | Reference to the package/extra selected for the reservation.                             |
| `priceAtBooking` | Double | Yes      | Unit price of the package at the time of booking. Used for historical pricing and audit. |
| `notes`          | String | No       | Optional staff note about the package-reservation mapping.                               |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **reservationId**: '00000000-0000-0000-0000-000000000000'
- **packageId**: '00000000-0000-0000-0000-000000000000'
- **priceAtBooking**: 0.0

### Auto Update Properties

`reservationId` `packageId` `priceAtBooking` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`reservationId` `packageId` `priceAtBooking` `notes`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`reservationId` `packageId`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Relation Properties

`reservationId` `packageId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **reservationId**: ID
  Relation to `reservation`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **packageId**: ID
  Relation to `package_`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Filter Properties

`reservationId` `packageId`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **reservationId**: ID has a filter named `reservationId`

- **packageId**: ID has a filter named `packageId`
