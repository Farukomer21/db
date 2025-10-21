const { GetGuestManager } = require("apiLayer");
const { z } = require("zod");

const GuestManagementMcpController = require("../../GuestManagementServiceMcpController");

class GetGuestMcpController extends GuestManagementMcpController {
  constructor(params) {
    super("getGuest", "getguest", params);
    this.dataName = "guest";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetGuestManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        guest: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            fullname: z.string().max(255).describe("Full name of the guest."),
            email: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe("Guest's email address for contact or info purposes."),
            phoneNumber: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Guest's phone number, used for record or contact as needed.",
              ),
            address: z
              .string()
              .optional()
              .nullable()
              .describe("Full postal address of the guest."),
            notes: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Internal staff comments for the guest record (not exposed to guests).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.",
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
      guestId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to query the required data object.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getGuest",
    description: "Retrieves a guest record by ID for staff operations.",
    parameters: GetGuestMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetGuestMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetGuestMcpController.getOutputSchema().parse(result);
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
