const {
  getPackageReservationById,
  getIdListOfPackageReservationByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexPackageReservationData = async () => {
  const packageReservationIndexer = new ElasticIndexer("packageReservation", {
    isSilent: true,
  });
  console.log("Starting to update indexes for PackageReservation");
  const idList = (await getIdListOfPackageReservationByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getPackageReservationById(chunk);
    if (dataList.length) {
      await packageReservationIndexer.indexBulkData(dataList);
      await packageReservationIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexPackageReservationData();
    console.log(
      "PackageReservation agregated data is indexed, total packageReservations:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing PackageReservation data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
