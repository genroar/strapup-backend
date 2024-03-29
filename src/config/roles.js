const allRoles = {
  user: ['getModels','getBrands'],
  admin: ['getUsers', 'manageUsers','getModels', 'getBrands'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

