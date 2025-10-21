const { ServicePublisher } = require("serviceCommon");

// Personnel Event Publisher Classes

// Publisher class for createPersonnel api
const { PersonnelCreatedTopic } = require("./topics");
class PersonnelCreatedPublisher extends ServicePublisher {
  constructor(personnel, session, requestId) {
    super(PersonnelCreatedTopic, personnel, session, requestId);
  }

  static async Publish(personnel, session, requestId) {
    const _publisher = new PersonnelCreatedPublisher(
      personnel,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updatePersonnel api
const { PersonnelUpdatedTopic } = require("./topics");
class PersonnelUpdatedPublisher extends ServicePublisher {
  constructor(personnel, session, requestId) {
    super(PersonnelUpdatedTopic, personnel, session, requestId);
  }

  static async Publish(personnel, session, requestId) {
    const _publisher = new PersonnelUpdatedPublisher(
      personnel,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deletePersonnel api
const { PersonnelDeletedTopic } = require("./topics");
class PersonnelDeletedPublisher extends ServicePublisher {
  constructor(personnel, session, requestId) {
    super(PersonnelDeletedTopic, personnel, session, requestId);
  }

  static async Publish(personnel, session, requestId) {
    const _publisher = new PersonnelDeletedPublisher(
      personnel,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getPersonnel api
const { PersonnelRetrivedTopic } = require("./topics");
class PersonnelRetrivedPublisher extends ServicePublisher {
  constructor(personnel, session, requestId) {
    super(PersonnelRetrivedTopic, personnel, session, requestId);
  }

  static async Publish(personnel, session, requestId) {
    const _publisher = new PersonnelRetrivedPublisher(
      personnel,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listPersonnels api
const { PersonnelsListedTopic } = require("./topics");
class PersonnelsListedPublisher extends ServicePublisher {
  constructor(personnels, session, requestId) {
    super(PersonnelsListedTopic, personnels, session, requestId);
  }

  static async Publish(personnels, session, requestId) {
    const _publisher = new PersonnelsListedPublisher(
      personnels,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  PersonnelCreatedPublisher,
  PersonnelUpdatedPublisher,
  PersonnelDeletedPublisher,
  PersonnelRetrivedPublisher,
  PersonnelsListedPublisher,
};
