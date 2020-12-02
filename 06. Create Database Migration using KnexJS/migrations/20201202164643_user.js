
exports.up = function(knex) {
  // create users table
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('username', 30).notNullable();
    table.string('password', 100).notNullable();
  });
};

exports.down = function(knex) {
    // drop users table
  return knex.schema.dropTableIfExists('users');
};
