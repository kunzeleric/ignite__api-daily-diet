import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.float('calories').after('is_diet')
    table.text('meal_type').after('calories')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet', (table) => {
    table.dropColumn('calories')
    table.dropColumn('meal_type')
  })
}
