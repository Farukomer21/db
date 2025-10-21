# Service Design Specification - Object Design for package\_

**db-packagemanagement-service** documentation

## Document Overview

This document outlines the object design for the `package_` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## package\_ Data Object

### Object Overview

**Description:** Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                                                            |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `name`        | String | Yes      | Name of the package or extra service.                                                  |
| `description` | String | Yes      | Detailed description of the package/extra service.                                     |
| `price`       | Double | Yes      | Price for the package/extra, in hotel currency.                                        |
| `duration`    | String | No       | (Optional) How long the package/extra is valid (e.g., per day, per stay, etc.).        |
| `conditions`  | String | No       | (Optional) Any conditions or rules attached to the package (e.g., must book 2 nights). |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **name**: 'default'
- **description**: 'default'
- **price**: 0.0

### Auto Update Properties

`name` `description` `price` `duration` `conditions`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`name` `description`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.
