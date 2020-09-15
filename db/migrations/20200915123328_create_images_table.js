exports.up = function (knex) {
  return knex.schema.createTable("images", (imagesTable) => {
    imagesTable.increments("image_id").primary().notNullable();
    imagesTable.string("image_desc");
    imagesTable
      .integer("experience_id")
      .references("experiences.experience_id")
      .notNullable()
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
