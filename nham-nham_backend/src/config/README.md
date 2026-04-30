# config/

Centralized application configuration — everything related to how the app connects to external services and behaves in different environments.

## What Goes Here

- `data-source.ts`
  - The TypeORM data source configuration. Used by:
    - The NestJS app to connect to PostgreSQL at runtime
    - The migration CLI to run migrations from the command line

```typescript
// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // NEVER true in production
});
```

## Other config files you may add

| File | Purpose |
| --- | --- |
| `app.config.ts` | General app settings (port, API prefix, CORS origins) |
| `jwt.config.ts` | JWT secret, expiration times |
| `storage.config.ts` | File upload settings (S3, local storage) |
| `mail.config.ts` | Email service config (SMTP, SendGrid) |

## Environment Variables

All config files should read from environment variables (`.env` file), never hard-code values.

### `.env.example`

database connection example:

```
database_host=localhost
database_port=5432
database_user=postgres
database_password=your_password
database_name=nham_nham
```

jwt secret example:

```
jwt_secret=your_jwt_secret
jwt_expires_in=7d
```

app port and API prefix:

```
app_port=3000
app_api_prefix=api/v1
```

## Rules for This Folder

- No business logic — only configuration values and setup.
- Use environment variables — never hard-code secrets or connection strings.
- Validate config — use `@nestjs/config` with Joi or class-validator to fail fast on missing env vars.
- One file per concern — separate database config from JWT config from mail config.
