const personnelFunctions = require("./personnel");

module.exports = {
  // main Database
  createPersonnel: personnelFunctions.createPersonnel,
  getIdListOfPersonnelByField: personnelFunctions.getIdListOfPersonnelByField,
  getPersonnelById: personnelFunctions.getPersonnelById,
  getPersonnelAggById: personnelFunctions.getPersonnelAggById,
  getPersonnelListByQuery: personnelFunctions.getPersonnelListByQuery,
  getPersonnelStatsByQuery: personnelFunctions.getPersonnelStatsByQuery,
  getPersonnelByQuery: personnelFunctions.getPersonnelByQuery,
  updatePersonnelById: personnelFunctions.updatePersonnelById,
  updatePersonnelByIdList: personnelFunctions.updatePersonnelByIdList,
  updatePersonnelByQuery: personnelFunctions.updatePersonnelByQuery,
  deletePersonnelById: personnelFunctions.deletePersonnelById,
  deletePersonnelByQuery: personnelFunctions.deletePersonnelByQuery,
  dbScriptCreatePersonnel: personnelFunctions.dbScriptCreatePersonnel,
  dbScriptUpdatePersonnel: personnelFunctions.dbScriptUpdatePersonnel,
  dbScriptDeletePersonnel: personnelFunctions.dbScriptDeletePersonnel,
  dbScriptGetPersonnel: personnelFunctions.dbScriptGetPersonnel,
  dbScriptListPersonnels: personnelFunctions.dbScriptListPersonnels,
};
