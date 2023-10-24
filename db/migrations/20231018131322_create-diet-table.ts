import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('diet', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.datetime('createdAt').defaultTo(knex.fn.now())
    table.boolean('is_diet').notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('users.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('diet')
}
