const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class PackageReservationQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("packageReservation", [], Op.and, Op.eq, input, wClause);
  }
}

class PackageReservationQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("packageReservation", []);
  }
}

module.exports = {
  PackageReservationQueryCache,
  PackageReservationQueryCacheInvalidator,
};
