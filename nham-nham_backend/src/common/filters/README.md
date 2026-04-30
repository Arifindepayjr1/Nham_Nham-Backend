# Filters

Exception filters that catch errors and return consistent error responses to the Flutter app.

## Why Filters Matter

Without filters, different errors return different response shapes — your Flutter app would need to handle many formats. Filters ensure every error looks the same:

```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/auth/register"
}
```

## Common Filters for Nham Nham

### HttpExceptionFilter — Catch all HTTP errors

```typescript
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### DatabaseExceptionFilter — Catch PostgreSQL errors

```typescript
// database-exception.filter.ts
// Catches errors like: duplicate key, foreign key violation, etc.
// Converts raw PostgreSQL errors into user-friendly messages.
```

Rules:

- File naming: kebab-case.filter.ts
- Register globally in `main.ts` or `app.module.ts` so they apply everywhere.
- Always return the same JSON shape — your Flutter team should only need one error model.
