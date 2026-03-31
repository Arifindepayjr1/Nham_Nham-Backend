database/
Everything related to database schema management and initial data. This folder does NOT contain business logic or queries — those live in each module's service file.

Subfolders
migrations/
Version-controlled schema changes for PostgreSQL. Each file represents one change to the database structure.

File naming: {timestamp}-{DescriptiveName}.ts

migrations/
├── 1717000000000-CreateUsersTable.ts
├── 1717100000000-CreateRestaurantsTable.ts
├── 1717200000000-CreateMenuItemsTable.ts
├── 1717300000000-CreateOrdersTable.ts
└── 1717400000000-AddPhoneToUsers.ts
Commands:

# Create a new empty migration

npm run migration:create src/database/migrations/YourMigrationName

# Run all pending migrations

npm run migration:run

# Revert the last migration

npm run migration:revert

# Check which migrations have/haven't run

npm run migration:show
Golden rules:

Never edit a migration that has already been run — create a new one
Never delete migration files — they are your database history
Always write both up() and down() methods
One migration = one logical change (don't mix creating 2 unrelated tables)
Test migrations locally before pushing to Git
See the README inside migrations/ for more details and examples.

seeds/
Scripts that populate the database with initial or test data.

Types of seeds:

Type Purpose Example
Required data Data the app needs to function Admin user, default roles, food categories
Test data Fake data for development 50 sample restaurants, 200 menu items
Commands:

# Run all seeds

npm run seed:run
See the README inside seeds/ for more details.

database.module.ts (optional)
If you want a shared database module that provides the DataSource to all feature modules, place it here.

Rules for This Folder
Only schema and data scripts — no business logic, no query helpers
Migrations are immutable — once pushed to Git, never edit them
Seeds are idempotent — running them twice should not create duplicate data (use INSERT ... ON CONFLICT DO NOTHING)
Keep migrations small — easier to review, easier to rollback
