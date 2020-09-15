exports.up = function (knex) {
  return knex.schema.createTable("experiences", (experiencesTable) => {
    experiencesTable.increments("experience_id").primary().notNullable();
    experiencesTable.string("title").notNullable();
    experiencesTable.text("body").notNullable();
    experiencesTable
      .string("username")
      .references("users.username")
      .notNullable();
    experiencesTable.timestamp("created_at").defaultTo(knex.fn.now());
    experiencesTable.string("location_lat").notNullable();
    experiencesTable.string("location_long").notNullable();
    experiencesTable.integer("likes").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("experiences");
};
