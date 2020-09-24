exports.up = function (knex) {
  return knex.schema.createTable("tag_experience_junction", (junctionTable) => {
    junctionTable.integer("tag_id").references("tags.tag_id").notNullable();
    junctionTable
      .integer("experience_id")
      .references("experiences.experience_id")
      .notNullable()
      .onDelete("CASCADE");
    junctionTable.primary(["tag_id", "experience_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tag_experience_junction");
};
