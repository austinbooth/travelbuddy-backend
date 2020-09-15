exports.up = function (knex) {
  return knex.schema.createTable("images", (imagesTable) => {
    imagesTable.increments("image_id").primary().notNullable();
    imagesTable.string("image_desc");
    imagesTable.string("belongs_to_title").references("experiences.title").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};