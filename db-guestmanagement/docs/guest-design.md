# Service Design Specification - Object Design for guest

**db-guestmanagement-service** documentation

## Document Overview

This document outlines the object design for the `guest` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## guest Data Object

### Object Overview

**Description:** Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                                           |
| ------------- | ------ | -------- | --------------------------------------------------------------------- |
| `fullname`    | String | Yes      | Full name of the guest.                                               |
| `email`       | String | No       | Guest&#39;s email address for contact or info purposes.               |
| `phoneNumber` | String | No       | Guest&#39;s phone number, used for record or contact as needed.       |
| `address`     | Text   | No       | Full postal address of the guest.                                     |
| `notes`       | Text   | No       | Internal staff comments for the guest record (not exposed to guests). |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **fullname**: 'default'

### Auto Update Properties

`fullname` `email` `phoneNumber` `address` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`fullname` `email` `phoneNumber` `address`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Filter Properties

`fullname` `email` `phoneNumber`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **fullname**: String has a filter named `fullname`

- **email**: String has a filter named `email`

- **phoneNumber**: String has a filter named `phoneNumber`
