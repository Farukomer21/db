# Service Design Specification - Object Design for roomPrice

**db-roompricing-service** documentation

## Document Overview

This document outlines the object design for the `roomPrice` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## roomPrice Data Object

### Object Overview

**Description:** Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                                                                   |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| `roomId`      | ID     | Yes      | Reference to the room for which this price is applicable.                                     |
| `startDate`   | Date   | Yes      | Start date from which this price is effective (inclusive).                                    |
| `endDate`     | Date   | No       | Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates. |
| `price`       | Double | Yes      | Price value for this room and date range, in hotel currency.                                  |
| `priceType`   | Enum   | Yes      | Price type: standard, promotional, or seasonal.                                               |
| `description` | String | No       | Staff-facing description or note for this price entry.                                        |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **roomId**: '00000000-0000-0000-0000-000000000000'
- **startDate**: new Date()
- **price**: 0.0
- **priceType**: "standard"

### Auto Update Properties

`roomId` `startDate` `endDate` `price` `priceType` `description`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **priceType**: [standard, promotional, seasonal]

### Elastic Search Indexing

`roomId` `startDate` `endDate` `price` `priceType` `description`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`roomId` `startDate` `priceType`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Relation Properties

`roomId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **roomId**: ID
  Relation to `room`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Filter Properties

`roomId` `startDate` `endDate` `priceType`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **roomId**: ID has a filter named `roomId`

- **startDate**: Date has a filter named `startDate`

- **endDate**: Date has a filter named `endDate`

- **priceType**: Enum has a filter named `priceType`
