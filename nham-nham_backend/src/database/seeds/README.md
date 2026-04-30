# Seeds Directory

Scripts that populate the database with initial data that the app needs to function, or test data for development.

## Types of Seeds

### Required Seeds (Always Run)

Data your app cannot function without:

```typescript
// roles.seed.ts — the app needs these roles to exist
await dataSource.query(`
INSERT INTO roles (name, description) VALUES
    ('customer', 'Regular app user who orders food'),
    ('restaurant_owner', 'Manages a restaurant and menu'),
    ('driver', 'Delivers orders to customers'),
    ('admin', 'Full system access')
  ON CONFLICT (name) DO NOTHING;
`);
```

```typescript
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
```

### Development Seeds (Dev Only)

Fake data to make development easier:

```typescript
// dev-restaurants.seed.ts — sample restaurants for testing
await dataSource.query(`
INSERT INTO restaurants (name, address, is_halal_certified) VALUES
    ('Halal Kitchen', '123 Main St', true),
    ('Nham Nham Express', '456 Oak Ave', true),
    ('The Spice House', '789 Elm Rd', true)
  ON CONFLICT DO NOTHING;
`);
```

## Key Rule: Idempotent

Seeds must be safe to run multiple times without creating duplicates. Always use:

- `INSERT ... ON CONFLICT DO NOTHING`
or check `IF NOT EXISTS` before inserting.

```sql
-- GOOD — safe to run many times
INSERT INTO roles (name) VALUES ('admin') ON CONFLICT (name) DO NOTHING;