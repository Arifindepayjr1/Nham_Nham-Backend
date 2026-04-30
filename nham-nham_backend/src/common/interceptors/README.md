# interceptors/

Interceptors transform requests before they reach the controller, or responses before they're sent back to the Flutter app. They wrap around the controller logic.

## How Interceptors Work

Request → Interceptor (before) → Controller → Interceptor (after) → Response

## Common Interceptors for Nham Nham

- **TransformInterceptor** — Wrap all responses in a standard shape

```typescript
// transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

*Example:*

- Before interceptor: `{ id: 1, email: "<user@test.com>" }`
- After interceptor: `{ statusCode: 200, data: { id: 1, email: "<user@test.com>" }, timestamp: "..." }`

- **LoggingInterceptor** — Log request time and details

```typescript
// logging.interceptor.ts
// Logs: "GET /api/v1/users - 45ms"
// Helpful for debugging slow endpoints
```

- **TimeoutInterceptor** — Cancel slow requests

```typescript
// timeout.interceptor.ts
// Automatically cancels requests that take longer than X seconds
// Prevents the Flutter app from waiting forever```
*Rules*
- File naming: `kebab-case.interceptor.ts`
- Register globally in `main.ts` for consistent behavior.
- Keep interceptors focused — one interceptor = one responsibility.
- Don't put business logic here — interceptors handle cross-cutting concerns (logging, formatting, caching).
