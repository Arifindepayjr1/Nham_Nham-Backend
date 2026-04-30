# common/

Shared utilities used across all modules in the application. Code placed here is not specific to any feature — it's reusable infrastructure.

## Subfolders

### decorators/

Custom decorators that add metadata or simplify repetitive patterns.

**Examples:**

- `@CurrentUser()` — extracts the authenticated user from the request
- `@Roles('admin', 'driver')` — marks which roles can access an endpoint
- `@Public()` — marks an endpoint as publicly accessible (no auth required)

```typescript
// Example: current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

**Usage in a controller:**

```typescript
@Get('profile')
getProfile(@CurrentUser() user) {
  return user;
}
```

### filters/

Exception filters that catch errors and return consistent error responses to the Flutter app.

**Examples:**

- `HttpExceptionFilter` — formats all HTTP errors into a standard JSON shape
- `DatabaseExceptionFilter` — catches PostgreSQL errors (duplicate key, constraint violations)

**Standard error response shape for Flutter:**

```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
