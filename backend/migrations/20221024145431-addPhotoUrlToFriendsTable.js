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
  return db.addColumn('friends', 'photoUrl', {
    type: 'string',
    notNull: true,
    defaultValue: '../../../../assets/pexels-thgusstavo-santana-1933873.jpg',
  });
};

exports.down = function (db) {
  return db.removeColumn('friends', 'photoUrl');
};

exports._meta = {
  version: 1,
};