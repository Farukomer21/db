const { UpdateRoomPriceManager } = require("apiLayer");
const { z } = require("zod");

const RoomPricingMcpController = require("../../RoomPricingServiceMcpController");

class UpdateRoomPriceMcpController extends RoomPricingMcpController {
  constructor(params) {
    super("updateRoomPrice", "updateroomprice", params);
    this.dataName = "roomPrice";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateRoomPriceManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        roomPrice: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            roomId: z
              .string()
              .uuid()
              .describe(
                "Reference to the room for which this price is applicable.",
              ),
            startDate: z
              .string()
              .describe(
                "Start date from which this price is effective (inclusive).",
              ),
            endDate: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates.",
              ),
            price: z
              .number()
              .describe(
                "Price value for this room and date range, in hotel currency.",
              ),
            priceType: z
              .enum(["standard", "promotional", "seasonal"])
              .describe("Price type: standard, promotional, or seasonal."),
            description: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Staff-facing description or note for this price entry.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.",
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
      roomPriceId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      roomId: z
        .string()
        .uuid()
        .optional()
        .describe("Reference to the room for which this price is applicable."),

      startDate: z
        .string()
        .optional()
        .describe("Start date from which this price is effective (inclusive)."),

      endDate: z
        .string()
        .optional()
        .describe(
          "Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates.",
        ),

      price: z
        .number()
        .optional()
        .describe(
          "Price value for this room and date range, in hotel currency.",
        ),

      priceType: z
        .enum([])
        .optional()
        .describe("Price type: standard, promotional, or seasonal."),

      description: z
        .string()
        .max(255)
        .optional()
        .describe("Staff-facing description or note for this price entry."),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateRoomPrice",
    description:
      "Updates an existing room price record. Allows adjustment of price, dates, type, or description for staff maintenance.",
    parameters: UpdateRoomPriceMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new UpdateRoomPriceMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return UpdateRoomPriceMcpController.getOutputSchema().parse(result);
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
