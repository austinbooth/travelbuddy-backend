exports.up = function (knex) {
  return knex.schema.createTable("tags", (tagsTable) => {
    tagsTable.increments("tag_id").primary().notNullable();
    tagsTable.string("tag_text").unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
