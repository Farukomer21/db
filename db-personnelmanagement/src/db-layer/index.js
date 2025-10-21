const mainFunctions = require("./main");

module.exports = {
  // main Database
  createPersonnel: mainFunctions.createPersonnel,
  getIdListOfPersonnelByField: mainFunctions.getIdListOfPersonnelByField,
  getPersonnelById: mainFunctions.getPersonnelById,
  getPersonnelAggById: mainFunctions.getPersonnelAggById,
  getPersonnelListByQuery: mainFunctions.getPersonnelListByQuery,
  getPersonnelStatsByQuery: mainFunctions.getPersonnelStatsByQuery,
  getPersonnelByQuery: mainFunctions.getPersonnelByQuery,
  updatePersonnelById: mainFunctions.updatePersonnelById,
  updatePersonnelByIdList: mainFunctions.updatePersonnelByIdList,
  updatePersonnelByQuery: mainFunctions.updatePersonnelByQuery,
  deletePersonnelById: mainFunctions.deletePersonnelById,
  deletePersonnelByQuery: mainFunctions.deletePersonnelByQuery,
  dbScriptCreatePersonnel: mainFunctions.dbScriptCreatePersonnel,
  dbScriptUpdatePersonnel: mainFunctions.dbScriptUpdatePersonnel,
  dbScriptDeletePersonnel: mainFunctions.dbScriptDeletePersonnel,
  dbScriptGetPersonnel: mainFunctions.dbScriptGetPersonnel,
  dbScriptListPersonnels: mainFunctions.dbScriptListPersonnels,
};
