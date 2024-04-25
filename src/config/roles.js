const allRoles = {
  user: ['createModel', 'getUsers', 'createWatch', 'manageModel', 'getModel','getBrands'],
  admin: ['getUsers', 'manageUsers', 'manageModel', 'getModel', 'createModel', 'createWatch', 'getBrands'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

