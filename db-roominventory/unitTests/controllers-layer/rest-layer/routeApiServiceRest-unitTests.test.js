const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("UpdateRoomRestController", () => {
  let updateRoom;
  let processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    processRequestStub = sinon.stub();

    updateRoom = proxyquire(
      "../../../src/controllers-layer/rest-layer/main/room/update-room-api.js",
      {
        serviceCommon: {
          HexaLogTypes: {},
          hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
        },
        apiLayer: {
          UpdateRoomManager: sinon.stub(),
        },
        "../../RoomInventoryServiceRestController": class {
          constructor(name, routeName, _req, _res, _next) {
            this._req = _req;
            this._res = _res;
            this._next = _next;
            this.processRequest = processRequestStub;
          }
        },
      },
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create instance and call processRequest", async () => {
    await updateRoom(req, res, next);

    expect(processRequestStub.calledOnce).to.be.true;
  });
});
