'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('foods', {
    columns: {
      id: { type: 'int', autoIncrement: true, notNull: true, primaryKey: true },
      name: { type: 'string', notNull: true },
      friendId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'foods_friendId_fk',
          table: 'friends',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: {
            friendId: 'id',
          },
        },
      },
    },
    ifNotExists: true,
  });
};

exports.down = function (db) {
  return db.dropTable('foods');
};

exports._meta = {
  version: 1,
};
