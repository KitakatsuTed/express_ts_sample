'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('OrganizationUsers', 'role', {
        type: Sequelize.STRING,
        defaultValue: 'normal' // Enum.OrganizationUser.MEMBER_ROLE.NORMAL で書きたいけどsyntax errorなのでいったん放置
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('OrganizationUsers', 'role'),
    ]
  }
};
