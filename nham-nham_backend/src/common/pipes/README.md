# Pipes

Pipes validate and transform incoming data before it reaches the controller. If validation fails, the request is rejected with a **400 Bad Request** before any business logic runs.

## How Pipes Work

```
Flutter sends data → Pipe (validate & transform) → Controller (safe to use)
                         ↓ INVALID
                   400 Bad Request
```

## Built-in Pipes (from NestJS)

You'll use these most often — no need to create custom versions:

- **ValidationPipe** — validates DTOs using class-validator decorators

  ```typescript
  @Post('register')
  register(@Body(ValidationPipe) dto: RegisterDto) { ... }
  ```

- **ParseUUIDPipe** — ensures param is a valid UUID

  ```typescript
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { ... }
  ```

- **ParseIntPipe** — ensures param is a number

  ```typescript
  @Get('page/:num')
  getPage(@Param('num', ParseIntPipe) num: number) { ... }
  ```

## Custom Pipes for Nham Nham

### TrimPipe — Trim whitespace from strings

```typescript
// trim.pipe.ts
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'object' && value !== null) {
      for (const key of Object.keys(value)) {
        if (typeof value[key] === 'string') {
          value[key] = value[key].trim();
        }
      }
    }
    return value;
  }
}
the `
