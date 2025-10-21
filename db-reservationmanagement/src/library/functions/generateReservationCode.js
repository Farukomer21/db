const crypto = require("crypto");
module.exports = function (reservation) {
  // 10-char random, hex, collision safe; non-guessable.
  return crypto.randomBytes(8).toString("hex");
};
