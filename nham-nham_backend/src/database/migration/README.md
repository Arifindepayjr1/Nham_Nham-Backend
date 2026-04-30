# migrations/

Database schema version control. Each file here represents one structural change to the PostgreSQL database.

## How It Works

- You create a migration file with `up()` (apply) and `down()` (rollback)
- TypeORM tracks which migrations have run in a migrations table in your database
- `npm run migration:run` only runs new migrations that haven't been applied yet

## Creating a Migration

```bash
npm run migration:create src/database/migrations/YourMigrationName
```

This generates an empty file like:

```typescript
// 1717000000000-YourMigrationName.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourMigrationName1717000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Write your raw SQL here to APPLY the change
    await queryRunner.query(`\nCREATE TABLE your_table (
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
```

## Common Migration Examples

### Create a table

```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  is_halal_certified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Add a column

```sql
dd ALTER TABLE restaurants ADD COLUMN phone VARCHAR(20);
dd ```
### Add a foreign key
```sql
dd ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
dd ```
### Create an index
```sql
dd CREATE INDEX idx_restaurants_name ON restaurants(name);
dd ```
### Add an enum type
```sql
dd CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled');
dd ALTER TABLE orders ADD COLUMN status order_status DEFAULT 'pending';
dd ```

## Commands 
npm run migration:create src/database/migrations/MigrationName   # Create empty migration 
npm run migration:run                                             # Apply pending migrations 
npm run migration:revert                                          # Undo last migration 
npm run migration:show                                            # Check status 

## Rules 
ever edit a migration that has been pushed to Git or run in production.
never delete migration files — they are permanent history.
always write down() — you will need rollback capability.
one change per migration — don't mix "create users" and "create orders" in one file.
uSe descriptive names — CreateRestaurantsTable, AddPhoneToUsers, CreateOrderStatusEnum.
test locally first — run migration:run and migration:revert before pushing.
