module.exports = async function (reservationId, packageId) {
  // pseudo-query: given reservationId+packageId, returns mapping if any exists (active)
  return await this.model("packageReservation").findOne({
    where: {
      reservationId: reservationId,
      packageId: packageId,
      isActive: true,
    },
  });
};
