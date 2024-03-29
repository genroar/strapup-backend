const allRoles = {
  user: ['getBrands'],
  admin: ['getUsers', 'manageUsers','getBrands'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
