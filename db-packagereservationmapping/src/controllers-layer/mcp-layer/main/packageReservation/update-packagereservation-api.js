const { UpdatePackageReservationManager } = require("apiLayer");
const { z } = require("zod");

const PackageReservationMappingMcpController = require("../../PackageReservationMappingServiceMcpController");

class UpdatePackageReservationMcpController extends PackageReservationMappingMcpController {
  constructor(params) {
    super("updatePackageReservation", "updatepackagereservation", params);
    this.dataName = "packageReservation";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdatePackageReservationManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        packageReservation: z
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
          ),
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
      packageReservationId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      reservationId: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Reference to the reservation that this package is linked to.",
        ),

      packageId: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Reference to the package/extra selected for the reservation.",
        ),

      priceAtBooking: z
        .number()
        .optional()
        .describe(
          "Unit price of the package at the time of booking. Used for historical pricing and audit.",
        ),

      notes: z
        .string()
        .max(255)
        .optional()
        .describe("Optional staff note about the package-reservation mapping."),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updatePackageReservation",
    description:
      "Update the price or notes in a package-reservation mapping, or (rare) fix package or reservation linkage. Fails if updated (reservationId, packageId) would create duplicate.",
    parameters: UpdatePackageReservationMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdatePackageReservationMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdatePackageReservationMcpController.getOutputSchema().parse(result);
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
