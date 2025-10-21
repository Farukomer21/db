const { ListPackagesManager } = require("apiLayer");
const { z } = require("zod");

const PackageManagementMcpController = require("../../PackageManagementServiceMcpController");

class ListPackagesMcpController extends PackageManagementMcpController {
  constructor(params) {
    super("listPackages", "listpackages", params);
    this.dataName = "package_s";
    this.crudType = "list";
  }

  createApiManager() {
    return new ListPackagesManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        package_s: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            name: z
              .string()
              .max(255)
              .describe("Name of the package or extra service."),
            description: z
              .string()
              .max(255)
              .describe("Detailed description of the package/extra service."),
            price: z
              .number()
              .describe("Price for the package/extra, in hotel currency."),
            duration: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "(Optional) How long the package/extra is valid (e.g., per day, per stay, etc.).",
              ),
            conditions: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "(Optional) Any conditions or rules attached to the package (e.g., must book 2 nights).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.",
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
    name: "listPackages",
    description:
      "Lists all packages/extras available for reservations. Staff usage, can be used for guest package selection in reservation context.",
    parameters: ListPackagesMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new ListPackagesMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return ListPackagesMcpController.getOutputSchema().parse(result);
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
