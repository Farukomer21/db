const { ServicePublisher } = require("serviceCommon");

// SpecialRequest Event Publisher Classes

// Publisher class for createSpecialRequest api
const { SpecialrequestCreatedTopic } = require("./topics");
class SpecialrequestCreatedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestCreatedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestCreatedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateSpecialRequest api
const { SpecialrequestUpdatedTopic } = require("./topics");
class SpecialrequestUpdatedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestUpdatedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestUpdatedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getSpecialRequest api
const { SpecialrequestRetrivedTopic } = require("./topics");
class SpecialrequestRetrivedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestRetrivedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestRetrivedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteSpecialRequest api
const { SpecialrequestDeletedTopic } = require("./topics");
class SpecialrequestDeletedPublisher extends ServicePublisher {
  constructor(specialrequest, session, requestId) {
    super(SpecialrequestDeletedTopic, specialrequest, session, requestId);
  }

  static async Publish(specialrequest, session, requestId) {
    const _publisher = new SpecialrequestDeletedPublisher(
      specialrequest,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listSpecialRequests api
const { SpecialrequestsListedTopic } = require("./topics");
class SpecialrequestsListedPublisher extends ServicePublisher {
  constructor(specialrequests, session, requestId) {
    super(SpecialrequestsListedTopic, specialrequests, session, requestId);
  }

  static async Publish(specialrequests, session, requestId) {
    const _publisher = new SpecialrequestsListedPublisher(
      specialrequests,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for createSpecialRequestPublic api
const { SpecialrequestpublicCreatedTopic } = require("./topics");
class SpecialrequestpublicCreatedPublisher extends ServicePublisher {
  constructor(specialrequestpublic, session, requestId) {
    super(
      SpecialrequestpublicCreatedTopic,
      specialrequestpublic,
      session,
      requestId,
    );
  }

  static async Publish(specialrequestpublic, session, requestId) {
    const _publisher = new SpecialrequestpublicCreatedPublisher(
      specialrequestpublic,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listSpecialRequestsByCode api
const { SpecialrequestsbycodeListedTopic } = require("./topics");
class SpecialrequestsbycodeListedPublisher extends ServicePublisher {
  constructor(specialrequestsbycode, session, requestId) {
    super(
      SpecialrequestsbycodeListedTopic,
      specialrequestsbycode,
      session,
      requestId,
    );
  }

  static async Publish(specialrequestsbycode, session, requestId) {
    const _publisher = new SpecialrequestsbycodeListedPublisher(
      specialrequestsbycode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getSpecialRequestByCode api
const { SpecialrequestbycodeRetrivedTopic } = require("./topics");
class SpecialrequestbycodeRetrivedPublisher extends ServicePublisher {
  constructor(specialrequestbycode, session, requestId) {
    super(
      SpecialrequestbycodeRetrivedTopic,
      specialrequestbycode,
      session,
      requestId,
    );
  }

  static async Publish(specialrequestbycode, session, requestId) {
    const _publisher = new SpecialrequestbycodeRetrivedPublisher(
      specialrequestbycode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for cancelSpecialRequestByCode api
const { SpecialrequestbycodeCanceledTopic } = require("./topics");
class SpecialrequestbycodeCanceledPublisher extends ServicePublisher {
  constructor(specialrequestbycode, session, requestId) {
    super(
      SpecialrequestbycodeCanceledTopic,
      specialrequestbycode,
      session,
      requestId,
    );
  }

  static async Publish(specialrequestbycode, session, requestId) {
    const _publisher = new SpecialrequestbycodeCanceledPublisher(
      specialrequestbycode,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  SpecialrequestCreatedPublisher,
  SpecialrequestUpdatedPublisher,
  SpecialrequestRetrivedPublisher,
  SpecialrequestDeletedPublisher,
  SpecialrequestsListedPublisher,
  SpecialrequestpublicCreatedPublisher,
  SpecialrequestsbycodeListedPublisher,
  SpecialrequestbycodeRetrivedPublisher,
  SpecialrequestbycodeCanceledPublisher,
};
