const { CreatePaymentManager } = require("apiLayer");
const { z } = require("zod");

const PaymentManagementMcpController = require("../../PaymentManagementServiceMcpController");

class CreatePaymentMcpController extends PaymentManagementMcpController {
  constructor(params) {
    super("createPayment", "createpayment", params);
    this.dataName = "payment";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreatePaymentManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        payment: z
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
          "Reference to the reservation for which this payment was made.",
        ),

      amount: z
        .number()
        .describe(
          "Amount paid in this transaction (in hotel's default currency).",
        ),

      paymentStatus: z
        .enum([])
        .describe(
          "Current status of the payment (pending, successful, failed, refunded).",
        ),

      paymentMethod: z
        .enum([])
        .describe(
          "How the payment was attempted: external gateway, cash, or card (staff-side record).",
        ),

      gatewayReference: z
        .string()
        .max(255)
        .optional()
        .describe(
          "External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation.",
        ),

      processedAt: z
        .string()
        .optional()
        .describe("Date/time the payment was processed, confirmed, or failed."),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createPayment",
    description:
      "Creates a new payment record associated with a reservation, logs status, method, and reference info.",
    parameters: CreatePaymentMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreatePaymentMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreatePaymentMcpController.getOutputSchema().parse(result);
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
