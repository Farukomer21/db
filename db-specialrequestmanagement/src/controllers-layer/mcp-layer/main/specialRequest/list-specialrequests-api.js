const { ListSpecialRequestsManager } = require("apiLayer");
const { z } = require("zod");

const SpecialRequestManagementMcpController = require("../../SpecialRequestManagementServiceMcpController");

class ListSpecialRequestsMcpController extends SpecialRequestManagementMcpController {
  constructor(params) {
    super("listSpecialRequests", "listspecialrequests", params);
    this.dataName = "specialRequests";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListSpecialRequestsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        specialRequests: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation for this special request.",
              ),
            guestId: z
              .string()
              .uuid()
              .describe(
                "ID of the guest who made this special request (redundant for tracing, resolved via reservation also).",
              ),
            requestText: z
              .string()
              .max(255)
              .describe("Text description of the guest's special request."),
            status: z
              .enum(["pending", "fulfilled", "canceled"])
              .describe(
                "Current status of the special request ('pending','fulfilled','canceled').",
              ),
            response: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Staff action or response to the special request (free text).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.",
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
    name: "listSpecialRequests",
    description:
      "Staff API to list all special requests, with filter by reservationId, guestId, status. Internal use for fulfillment and monitoring.",
    parameters: ListSpecialRequestsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListSpecialRequestsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListSpecialRequestsMcpController.getOutputSchema().parse(result);
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
