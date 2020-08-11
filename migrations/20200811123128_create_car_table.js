exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    // primary key
    tbl.increments("id");

    //// Critical Information (required) ////

    tbl.string("vin").notNullable().unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.string("mileage").notNullable();

    //// Additional Information (not required) ////

    tbl.string("transmission-type");
    tbl.string("title-status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
