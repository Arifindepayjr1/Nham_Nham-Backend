seeds/
Scripts that populate the database with initial data that the app needs to function, or test data for development.

Types of Seeds
Required Seeds (always run)
Data your app cannot function without:

// roles.seed.ts — the app needs these roles to exist
await dataSource.query(`
INSERT INTO roles (name, description) VALUES
    ('customer', 'Regular app user who orders food'),
    ('restaurant_owner', 'Manages a restaurant and menu'),
    ('driver', 'Delivers orders to customers'),
    ('admin', 'Full system access')
  ON CONFLICT (name) DO NOTHING;
`);

// food-categories.seed.ts — default food categories
await dataSource.query(`
INSERT INTO food_categories (name) VALUES
    ('Rice & Noodles'),
    ('Grilled & BBQ'),
    ('Soups'),
    ('Desserts'),
    ('Beverages')
  ON CONFLICT (name) DO NOTHING;
`);
Development Seeds (dev only)
Fake data to make development easier:

// dev-restaurants.seed.ts — sample restaurants for testing
await dataSource.query(`
INSERT INTO restaurants (name, address, is_halal_certified) VALUES
    ('Halal Kitchen', '123 Main St', true),
    ('Nham Nham Express', '456 Oak Ave', true),
    ('The Spice House', '789 Elm Rd', true)
  ON CONFLICT DO NOTHING;
`);
Key Rule: Idempotent
Seeds must be safe to run multiple times without creating duplicates. Always use:

INSERT ... ON CONFLICT DO NOTHING
Or check IF NOT EXISTS before inserting

// GOOD — safe to run many times
INSERT INTO roles (name) VALUES ('admin') ON CONFLICT (name) DO NOTHING;

// BAD — creates duplicate admin every time you run it
INSERT INTO roles (name) VALUES ('admin');
Seed File Structure

// example.seed.ts
import { DataSource } from 'typeorm';

export const seedRoles = async (dataSource: DataSource): Promise<void> => {
  await dataSource.query(`
INSERT INTO roles (name, description) VALUES
      ('customer', 'App user'),
      ('admin', 'System admin')
    ON CONFLICT (name) DO NOTHING;
  `);
  console.log('Roles seeded successfully');
};
Running Seeds

npm run seed:run
Rules
Always idempotent — running twice must not create duplicates
Separate required vs. dev seeds — don't put fake data in production seeds
Run after migrations — seeds assume tables already exist
Keep seeds updated — if you add a new required column, update the seed too
