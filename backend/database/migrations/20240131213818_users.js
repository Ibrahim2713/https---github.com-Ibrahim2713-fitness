/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * 
 * 
 * 
 * // Revise Database Schema
 * //
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
    tbl.increments('user_id')
    tbl.string('username', 30).notNullable().unique()
    tbl.string('password').notNullable()
    tbl.integer('age').notNullable()
    tbl.string('first_name').notNullable()
    tbl.string('last_name').notNullable()
    tbl.string('email').unique().notNullable()
    })
  
    .createTable('weights', tbl => {
        tbl.increments('weight_id')
        tbl.integer('current_weight').notNullable().defaultTo(100)
        tbl.integer('goal_weight').notNullable().defaultTo(150)

        tbl.integer('user_id')
            .unsigned()
            .references('users.user_id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .unique()    
    })
    .createTable('food_log', tbl => {
      tbl.increments('food_id')
      tbl.string('food_name').notNullable()
      tbl.integer('carbohydrates').notNullable()
      tbl.integer('protein').notNullable()
      tbl.integer('fats').notNullable()
      tbl.integer('calories').notNullable()
      tbl.float('serving_size').notNullable(); 
      tbl.string('serving_unit').notNullable().defaultTo('g'); 
      tbl.timestamp('logged_at').defaultTo(knex.fn.now())
      tbl.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    
     
    })
    .createTable('exercise_log', tbl => {
      tbl.increments('exercise_id')
      tbl.string('exercise_name').notNullable()
      tbl.integer('calories_burned').notNullable()
      tbl.integer('active_minutes').notNullable()
      tbl.timestamp('logged_at').defaultTo(knex.fn.now())
      tbl.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
}; 

/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ 
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('exercise_log')
  .dropTableIfExists('food_log')
  .dropTableIfExists('weights')
  .dropTableIfExists('users')
}; 
