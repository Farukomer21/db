module.exports = async function (roomNumber) {
  // This function should check the DB for existing active rooms with this roomNumber.
  if (!roomNumber) return false;
  const room = await this.db.room.findOne({
    where: { roomNumber, isActive: true },
  });
  return !!room;
};
