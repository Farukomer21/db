const { ConfirmReservationPaymentManager } = require("apiLayer");
const { z } = require("zod");

const ReservationManagementMcpController = require("../../ReservationManagementServiceMcpController");

class ConfirmReservationPaymentMcpController extends ReservationManagementMcpController {
  constructor(params) {
    super("confirmReservationPayment", "confirmreservationpayment", params);
    this.dataName = "reservation";
    this.crudType = "update";
  }

  createApiManager() {
    return new ConfirmReservationPaymentManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        reservation: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            guestId: z
              .string()
              .uuid()
              .describe("Reference to guest who made this reservation."),
            roomId: z
              .string()
              .uuid()
              .describe("Reference to the hotel room for this reservation."),
            checkInDate: z
              .string()
              .describe("Check-in date for the reservation."),
            checkOutDate: z
              .string()
              .describe("Check-out date for the reservation."),
            reservationCode: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Unique, cryptographically secure reservation code for guest access. Null until payment is confirmed.",
              ),
            packages: z.array(
              z
                .string()
                .uuid()
                .optional()
                .nullable()
                .describe(
                  "Array of package IDs associated to this reservation (maps to packageReservationMapping).",
                ),
            ),
            specialRequests: z.array(
              z
                .string()
                .uuid()
                .optional()
                .nullable()
                .describe(
                  "Array of specialRequest IDs associated with this reservation.",
                ),
            ),
            paymentId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Reference to the payment record for this reservation.",
              ),
            status: z
              .enum(["pending", "confirmed", "canceled", "completed"])
              .describe(
                "Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.",
              ),
            numGuests: z
              .number()
              .int()
              .describe("Number of guests for this reservation."),
            totalPrice: z
              .number()
              .describe("Total price for the reservation (rooms + packages)."),
            notes: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Internal notes, only for staff eyes (not sent to guests/public).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.",
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
          "This id paremeter is used to select the required data object that will be updated",
        ),

      guestId: z
        .string()
        .uuid()
        .describe("Reference to guest who made this reservation."),

      roomId: z
        .string()
        .uuid()
        .describe("Reference to the hotel room for this reservation."),

      checkInDate: z.string().describe("Check-in date for the reservation."),

      checkOutDate: z.string().describe("Check-out date for the reservation."),

      packages: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Array of package IDs associated to this reservation (maps to packageReservationMapping).",
        ),

      specialRequests: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Array of specialRequest IDs associated with this reservation.",
        ),

      paymentId: z
        .string()
        .uuid()
        .optional()
        .describe("Reference to the payment record for this reservation."),

      status: z
        .enum([])
        .describe(
          "Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.",
        ),

      numGuests: z
        .number()
        .int()
        .describe("Number of guests for this reservation."),

      totalPrice: z
        .number()
        .describe("Total price for the reservation (rooms + packages)."),

      notes: z
        .string()
        .optional()
        .describe(
          "Internal notes, only for staff eyes (not sent to guests/public).",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "confirmReservationPayment",
    description:
      "Guest API. After external payment is successful, mark reservation as confirmed, generate &amp; store reservationCode.",
    parameters: ConfirmReservationPaymentMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ConfirmReservationPaymentMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ConfirmReservationPaymentMcpController.getOutputSchema().parse(result);
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
