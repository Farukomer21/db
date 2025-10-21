const { CreateFeedbackGuestManager } = require("apiLayer");
const { z } = require("zod");

const FeedbackManagementMcpController = require("../../FeedbackManagementServiceMcpController");

class CreateFeedbackGuestMcpController extends FeedbackManagementMcpController {
  constructor(params) {
    super("createFeedbackGuest", "createfeedbackguest", params);
    this.dataName = "feedback";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateFeedbackGuestManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        feedback: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation for which feedback is submitted. Used for traceability and eligibility check.",
              ),
            guestName: z
              .string()
              .max(255)
              .describe("Name of the guest submitting feedback (free text)."),
            rating: z
              .number()
              .int()
              .describe("Rating from 1 to 5 reflecting guest's satisfaction."),
            comment: z
              .string()
              .describe("Free-text feedback, comment on guest's experience."),
            submittedAt: z
              .string()
              .describe(
                "Timestamp of when feedback was submitted. Automatically set on create.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.",
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
      reservationId: z
        .string()
        .uuid()
        .describe(
          "Reference to the reservation for which feedback is submitted. Used for traceability and eligibility check.",
        ),

      guestName: z
        .string()
        .max(255)
        .describe("Name of the guest submitting feedback (free text)."),

      rating: z
        .number()
        .int()
        .describe("Rating from 1 to 5 reflecting guest's satisfaction."),

      comment: z
        .string()
        .describe("Free-text feedback, comment on guest's experience."),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createFeedbackGuest",
    description:
      "Allows guest to submit feedback after stay by reservation code, guest name, rating (1–5), and comment. Only permitted if reservation exists and status is &#39;completed&#39;. `submittedAt` is set automatically. No authentication required.",
    parameters: CreateFeedbackGuestMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreateFeedbackGuestMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreateFeedbackGuestMcpController.getOutputSchema().parse(result);
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
