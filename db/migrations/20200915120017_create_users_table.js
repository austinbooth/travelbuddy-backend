exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary().notNullable();
    usersTable.string("last_name").notNullable();
    usersTable.string("first_name").notNullable();
    usersTable.string("avatar_URL")
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};