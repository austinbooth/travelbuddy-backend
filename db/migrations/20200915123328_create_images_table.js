exports.up = function (knex) {
  return knex.schema.createTable("images", (imagesTable) => {
    imagesTable.increments("image_id").primary().notNullable();
    imagesTable.string("image_desc");
    imagesTable
      .integer("experience_id")
      .references("experiences.experience_id")
      .notNullable()
      .onDelete("CASCADE");
    imagesTable.string("image_URL").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
