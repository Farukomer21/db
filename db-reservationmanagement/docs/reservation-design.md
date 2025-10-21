# Service Design Specification - Object Design for reservation

**db-reservationmanagement-service** documentation

## Document Overview

This document outlines the object design for the `reservation` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## reservation Data Object

### Object Overview

**Description:** Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **idx_reservationCode_unique**: [reservationCode]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property          | Type    | Required | Description                                                                                          |
| ----------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `guestId`         | ID      | Yes      | Reference to guest who made this reservation.                                                        |
| `roomId`          | ID      | Yes      | Reference to the hotel room for this reservation.                                                    |
| `checkInDate`     | Date    | Yes      | Check-in date for the reservation.                                                                   |
| `checkOutDate`    | Date    | Yes      | Check-out date for the reservation.                                                                  |
| `reservationCode` | String  | No       | Unique, cryptographically secure reservation code for guest access. Null until payment is confirmed. |
| `packages`        | ID      | No       | Array of package IDs associated to this reservation (maps to packageReservationMapping).             |
| `specialRequests` | ID      | No       | Array of specialRequest IDs associated with this reservation.                                        |
| `paymentId`       | ID      | No       | Reference to the payment record for this reservation.                                                |
| `status`          | Enum    | Yes      | Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.            |
| `numGuests`       | Integer | Yes      | Number of guests for this reservation.                                                               |
| `totalPrice`      | Double  | Yes      | Total price for the reservation (rooms + packages).                                                  |
| `notes`           | Text    | No       | Internal notes, only for staff eyes (not sent to guests/public).                                     |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`packages` `specialRequests`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **guestId**: '00000000-0000-0000-0000-000000000000'
- **roomId**: '00000000-0000-0000-0000-000000000000'
- **checkInDate**: new Date()
- **checkOutDate**: new Date()
- **status**: pending
- **numGuests**: 0
- **totalPrice**: 0.0

### Constant Properties

`reservationCode`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`guestId` `roomId` `checkInDate` `checkOutDate` `packages` `specialRequests` `paymentId` `status` `numGuests` `totalPrice` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [pending, confirmed, canceled, completed]

### Elastic Search Indexing

`guestId` `roomId` `checkInDate` `checkOutDate` `reservationCode` `packages` `paymentId` `status` `numGuests` `totalPrice`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`guestId` `roomId` `reservationCode`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Unique Properties

`reservationCode`

Unique properties are enforced to have distinct values across all instances of the data object, preventing duplicate entries.
Note that a unique property is automatically indexed in the database so you will not need to set the `Indexed in DB` option.

### Cache Select Properties

`reservationCode`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Secondary Key Properties

`reservationCode`

Secondary key properties are used to create an additional indexed identifiers for the data object, allowing for alternative access patterns.
Different than normal indexed properties, secondary keys will act as primary keys and Mindbricks will provide automatic secondary key db utility functions to access the data object by the secondary key.

### Relation Properties

`guestId` `roomId` `packages` `specialRequests` `paymentId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **guestId**: ID
  Relation to `guest`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **roomId**: ID
  Relation to `room`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **packages**: ID
  Relation to `packageReservation`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

- **specialRequests**: ID
  Relation to `specialRequest`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

- **paymentId**: ID
  Relation to `payment`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

### Formula Properties

`reservationCode`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **reservationCode**: String
  - Formula: `(this.status==&#39;confirmed&#39;||this.status==&#39;completed&#39;)?LIB.generateReservationCode(this):null`
  - Update Formula: `(this.status==&#39;confirmed&#39;||this.status==&#39;completed&#39;) ? (this.reservationCode || LIB.generateReservationCode(this)) : null`
  - Calculate After Instance: No
  - Calculate When Input Has: [status]

### Filter Properties

`checkInDate` `checkOutDate` `reservationCode` `status`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **checkInDate**: Date has a filter named `checkIn`

- **checkOutDate**: Date has a filter named `checkOut`

- **reservationCode**: String has a filter named `reservationCode`

- **status**: Enum has a filter named `status`
