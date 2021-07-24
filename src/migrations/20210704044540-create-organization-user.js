'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrganizationUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Organizations', key: 'id',
          },
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users', key: 'id',
          },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('OrganizationUsers', ['userId', 'organizationId'], { unique: true })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('OrganizationUsers', ['userId', 'organizationId']);
    await queryInterface.dropTable('OrganizationUsers');
  }
};