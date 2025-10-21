module.exports = async function (id, reservationId, packageId) {
  // finds another (not this record) mapping with the same reservationId & packageId
  return await this.model("packageReservation").findOne({
    where: {
      reservationId: reservationId,
      packageId: packageId,
      id: { $ne: id },
      isActive: true,
    },
  });
};
