const { ListPackageReservationsManager } = require("apiLayer");
const { z } = require("zod");

const PackageReservationMappingMcpController = require("../../PackageReservationMappingServiceMcpController");

class ListPackageReservationsMcpController extends PackageReservationMappingMcpController {
  constructor(params) {
    super("listPackageReservations", "listpackagereservations", params);
    this.dataName = "packageReservations";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListPackageReservationsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        packageReservations: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation that this package is linked to.",
              ),
            packageId: z
              .string()
              .uuid()
              .describe(
                "Reference to the package/extra selected for the reservation.",
              ),
            priceAtBooking: z
              .number()
              .describe(
                "Unit price of the package at the time of booking. Used for historical pricing and audit.",
              ),
            notes: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Optional staff note about the package-reservation mapping.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "listPackageReservations",
    description:
      "Lists all package-reservation mappings, supporting filter by reservationId and packageId. Staff/internal only.",
    parameters: ListPackageReservationsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListPackageReservationsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListPackageReservationsMcpController.getOutputSchema().parse(result);
        console.log("Mcp Response Ready", JSON.stringify(result));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        console.log("Mcp Error Occured", err.message);
        //**errorLog
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
