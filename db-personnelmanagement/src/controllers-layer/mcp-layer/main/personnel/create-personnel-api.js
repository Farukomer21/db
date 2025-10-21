const { CreatePersonnelManager } = require("apiLayer");
const { z } = require("zod");

const PersonnelManagementMcpController = require("../../PersonnelManagementServiceMcpController");

class CreatePersonnelMcpController extends PersonnelManagementMcpController {
  constructor(params) {
    super("createPersonnel", "createpersonnel", params);
    this.dataName = "personnel";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreatePersonnelManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        personnel: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            name: z
              .string()
              .max(255)
              .describe("Full name of the employee/staff member."),
            jobTitle: z
              .string()
              .max(255)
              .describe(
                "Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).",
              ),
            department: z
              .string()
              .max(255)
              .describe(
                "Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).",
              ),
            startDate: z
              .string()
              .describe(
                "Date staff member started employment or became active at the hotel.",
              ),
            endDate: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Date staff member left or ended employment (null if current).",
              ),
            contactInfo: z
              .string()
              .max(255)
              .describe(
                "Contact information for operational use (email, phone, or other). Not sensitive HR data.",
              ),
            notes: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Internal operational notes about the staff member (free text, not sensitive HR data). Optional.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.",
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
      name: z
        .string()
        .max(255)
        .describe("Full name of the employee/staff member."),

      jobTitle: z
        .string()
        .max(255)
        .describe(
          "Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).",
        ),

      department: z
        .string()
        .max(255)
        .describe(
          "Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).",
        ),

      startDate: z
        .string()
        .describe(
          "Date staff member started employment or became active at the hotel.",
        ),

      endDate: z
        .string()
        .optional()
        .describe(
          "Date staff member left or ended employment (null if current).",
        ),

      contactInfo: z
        .string()
        .max(255)
        .describe(
          "Contact information for operational use (email, phone, or other). Not sensitive HR data.",
        ),

      notes: z
        .string()
        .max(255)
        .optional()
        .describe(
          "Internal operational notes about the staff member (free text, not sensitive HR data). Optional.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createPersonnel",
    description:
      "Creates a new personnel (staff) record in the hotel system for operational use. All fields except endDate and notes are required.",
    parameters: CreatePersonnelMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new CreatePersonnelMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return CreatePersonnelMcpController.getOutputSchema().parse(result);
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
