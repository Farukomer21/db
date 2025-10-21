const { ListAvailableRoomsManager } = require("apiLayer");
const { z } = require("zod");

const RoomInventoryMcpController = require("../../RoomInventoryServiceMcpController");

class ListAvailableRoomsMcpController extends RoomInventoryMcpController {
  constructor(params) {
    super("listAvailableRooms", "listavailablerooms", params);
    this.dataName = "rooms";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListAvailableRoomsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        rooms: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            roomNumber: z
              .string()
              .max(255)
              .describe("Unique number or code for the room (e.g., 101, B12)."),
            floor: z
              .number()
              .int()
              .describe("Floor number where room is located."),
            type: z
              .enum(["single", "double", "suite"])
              .describe("Room type (e.g., single, double, suite)."),
            capacity: z
              .number()
              .int()
              .describe("Maximum number of guests room can accommodate."),
            bedType: z
              .string()
              .max(255)
              .describe("Type of beds (e.g., queen, twin, king)."),
            amenities: z.array(
              z
                .string()
                .max(255)
                .optional()
                .nullable()
                .describe(
                  "Array of amenity descriptions (e.g., Wi-Fi, TV, minibar).",
                ),
            ),
            status: z
              .enum(["available", "occupied", "under_maintenance"])
              .describe(
                "Room status (available, occupied, under maintenance).",
              ),
            description: z
              .string()
              .optional()
              .nullable()
              .describe("Detailed textual description of the room."),
            images: z.array(
              z
                .string()
                .max(255)
                .optional()
                .nullable()
                .describe("Image URLs for the room."),
            ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.",
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
    name: "listAvailableRooms",
    description:
      "Lists available rooms for booking. Public API for reservation selection; allows filtering by type, capacity, floor, and more. Only rooms with &#39;available&#39; status are returned.",
    parameters: ListAvailableRoomsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListAvailableRoomsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListAvailableRoomsMcpController.getOutputSchema().parse(result);
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
