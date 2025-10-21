# Service Design Specification - Object Design for personnel

**db-personnelmanagement-service** documentation

## Document Overview

This document outlines the object design for the `personnel` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## personnel Data Object

### Object Overview

**Description:** Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                                                                     |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| `name`        | String | Yes      | Full name of the employee/staff member.                                                         |
| `jobTitle`    | String | Yes      | Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).           |
| `department`  | String | Yes      | Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).                   |
| `startDate`   | Date   | Yes      | Date staff member started employment or became active at the hotel.                             |
| `endDate`     | Date   | No       | Date staff member left or ended employment (null if current).                                   |
| `contactInfo` | String | Yes      | Contact information for operational use (email, phone, or other). Not sensitive HR data.        |
| `notes`       | String | No       | Internal operational notes about the staff member (free text, not sensitive HR data). Optional. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **name**: 'default'
- **jobTitle**: 'default'
- **department**: 'default'
- **startDate**: new Date()
- **contactInfo**: 'default'

### Auto Update Properties

`name` `jobTitle` `department` `startDate` `endDate` `contactInfo` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`name` `jobTitle` `department` `startDate` `endDate` `contactInfo` `notes`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Filter Properties

`name` `jobTitle` `department` `startDate` `endDate` `contactInfo`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **name**: String has a filter named `name`

- **jobTitle**: String has a filter named `jobTitle`

- **department**: String has a filter named `department`

- **startDate**: Date has a filter named `startDate`

- **endDate**: Date has a filter named `endDate`

- **contactInfo**: String has a filter named `contactInfo`
