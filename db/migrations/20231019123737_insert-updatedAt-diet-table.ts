import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.datetime('updatedAt').after('createdAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.dropColumn('updatedAt')
  })
}
