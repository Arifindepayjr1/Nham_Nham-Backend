migrations/
Database schema version control. Each file here represents one structural change to the PostgreSQL database.

How It Works
You create a migration file with up() (apply) and down() (rollback)
TypeORM tracks which migrations have run in a migrations table in your database
npm run migration:run only runs new migrations that haven't been applied yet
Creating a Migration

npm run migration:create src/database/migrations/YourMigrationName
This generates an empty file like:

// 1717000000000-YourMigrationName.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourMigrationName1717000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Write your raw SQL here to APPLY the change
    await queryRunner.query(`
CREATE TABLE your_table (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Write your raw SQL here to UNDO the change
    await queryRunner.query(`DROP TABLE IF EXISTS your_table`);
  }
}
Common Migration Examples
Create a table

CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  is_halal_certified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Add a column

ALTER TABLE restaurants ADD COLUMN phone VARCHAR(20);
Add a foreign key

ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
Create an index

CREATE INDEX idx_restaurants_name ON restaurants(name);
Add an enum type

CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled');
ALTER TABLE orders ADD COLUMN status order_status DEFAULT 'pending';
Commands

npm run migration:create src/database/migrations/MigrationName   # Create empty migration
npm run migration:run                                             # Apply pending migrations
npm run migration:revert                                          # Undo last migration
npm run migration:show                                            # Check status
Rules
Never edit a migration that has been pushed to Git or run in production
Never delete migration files — they are permanent history
Always write down() — you will need rollback capability
One change per migration — don't mix "create users" and "create orders" in one file
Use descriptive names — CreateRestaurantsTable, AddPhoneToUsers, CreateOrderStatusEnum
Test locally first — run migration:run and migration:revert before pushing
