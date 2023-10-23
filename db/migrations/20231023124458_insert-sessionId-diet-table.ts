import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.uuid('session_id').after('id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.dropColumn('session_id')
  })
}
