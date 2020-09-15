exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary().notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body");
    commentsTable.integer("likes").defaultTo(0);
    commentsTable.string("username").references("users.username").notNullable();
    commentsTable
      .integer("experience_id")
      .references("experiences.experience_id")
      .notNullable()
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
