const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ReservationQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("reservation", [], Op.and, Op.eq, input, wClause);
  }
}

class ReservationQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("reservation", []);
  }
}

module.exports = {
  ReservationQueryCache,
  ReservationQueryCacheInvalidator,
};
