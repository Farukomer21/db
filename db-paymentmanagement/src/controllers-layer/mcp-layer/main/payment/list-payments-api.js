const { ListPaymentsManager } = require("apiLayer");
const { z } = require("zod");

const PaymentManagementMcpController = require("../../PaymentManagementServiceMcpController");

class ListPaymentsMcpController extends PaymentManagementMcpController {
  constructor(params) {
    super("listPayments", "listpayments", params);
    this.dataName = "payments";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListPaymentsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        payments: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            reservationId: z
              .string()
              .uuid()
              .describe(
                "Reference to the reservation for which this payment was made.",
              ),
            amount: z
              .number()
              .describe(
                "Amount paid in this transaction (in hotel's default currency).",
              ),
            paymentStatus: z
              .enum(["pending", "successful", "failed", "refunded"])
              .describe(
                "Current status of the payment (pending, successful, failed, refunded).",
              ),
            paymentMethod: z
              .enum(["external_gateway", "cash", "card"])
              .describe(
                "How the payment was attempted: external gateway, cash, or card (staff-side record).",
              ),
            gatewayReference: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation.",
              ),
            processedAt: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Date/time the payment was processed, confirmed, or failed.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.",
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
    name: "listPayments",
    description:
      "Lists all payment records, with optional filters by reservationId, status, date, etc. Enables audit, reconciliation, and search (staff/internal).",
    parameters: ListPaymentsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListPaymentsMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListPaymentsMcpController.getOutputSchema().parse(result);
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
