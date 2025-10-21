const McpController = require("./McpController");

class PackageReservationMappingServiceMcpController extends McpController {
  constructor(name, routeName, req, res) {
    super(name, routeName, req, res);
    this.projectCodename = "db";
    this.isMultiTenant = false;
    this.tenantName = "";
    this.tenantId = "";
    this.tenantCodename = null;
    this.isLoginApi = false;
  }

  createApiManager() {
    return null;
  }
}

module.exports = PackageReservationMappingServiceMcpController;
