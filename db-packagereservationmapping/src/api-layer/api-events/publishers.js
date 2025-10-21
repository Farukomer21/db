const { ServicePublisher } = require("serviceCommon");

// PackageReservation Event Publisher Classes

// Publisher class for createPackageReservation api
const { PackagereservationCreatedTopic } = require("./topics");
class PackagereservationCreatedPublisher extends ServicePublisher {
  constructor(packagereservation, session, requestId) {
    super(
      PackagereservationCreatedTopic,
      packagereservation,
      session,
      requestId,
    );
  }

  static async Publish(packagereservation, session, requestId) {
    const _publisher = new PackagereservationCreatedPublisher(
      packagereservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updatePackageReservation api
const { PackagereservationUpdatedTopic } = require("./topics");
class PackagereservationUpdatedPublisher extends ServicePublisher {
  constructor(packagereservation, session, requestId) {
    super(
      PackagereservationUpdatedTopic,
      packagereservation,
      session,
      requestId,
    );
  }

  static async Publish(packagereservation, session, requestId) {
    const _publisher = new PackagereservationUpdatedPublisher(
      packagereservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deletePackageReservation api
const { PackagereservationDeletedTopic } = require("./topics");
class PackagereservationDeletedPublisher extends ServicePublisher {
  constructor(packagereservation, session, requestId) {
    super(
      PackagereservationDeletedTopic,
      packagereservation,
      session,
      requestId,
    );
  }

  static async Publish(packagereservation, session, requestId) {
    const _publisher = new PackagereservationDeletedPublisher(
      packagereservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getPackageReservation api
const { PackagereservationRetrivedTopic } = require("./topics");
class PackagereservationRetrivedPublisher extends ServicePublisher {
  constructor(packagereservation, session, requestId) {
    super(
      PackagereservationRetrivedTopic,
      packagereservation,
      session,
      requestId,
    );
  }

  static async Publish(packagereservation, session, requestId) {
    const _publisher = new PackagereservationRetrivedPublisher(
      packagereservation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listPackageReservations api
const { PackagereservationsListedTopic } = require("./topics");
class PackagereservationsListedPublisher extends ServicePublisher {
  constructor(packagereservations, session, requestId) {
    super(
      PackagereservationsListedTopic,
      packagereservations,
      session,
      requestId,
    );
  }

  static async Publish(packagereservations, session, requestId) {
    const _publisher = new PackagereservationsListedPublisher(
      packagereservations,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  PackagereservationCreatedPublisher,
  PackagereservationUpdatedPublisher,
  PackagereservationDeletedPublisher,
  PackagereservationRetrivedPublisher,
  PackagereservationsListedPublisher,
};
