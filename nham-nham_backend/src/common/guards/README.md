# guards/

## Guards Overview

Guards decide who can access an endpoint. They run **before** the controller method executes. If a guard returns `false`, the request is rejected with a **403 Forbidden**.

## How Guards Work

```
Request → Guard (can they access this?) → Controller (handle request)
                    ↓ NO
              403 Forbidden
```

## Common Guards for Nham Nham

### JwtAuthGuard — Is the user logged in?

```typescript
// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

#### Usage

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile() { ... }  // only logged-in users
```

### RolesGuard — Does the user have the right role?

```typescript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!requiredRoles) return true; // no roles required

    const { user } = ctx.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
e```
#### Usage:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Delete('users/:id')
deleteUser() { ... }  // only admins
```

## Rules and Best Practices

- **File naming:** kebab-case.guard.ts \\ e.g., `auth-role.guard.ts`.
- Guards check **access**, not data — validation belongs in pipes/DTOs.
- Order matters: `@UseGuards(JwtAuthGuard, RolesGuard)` runs JWT first, then roles.
- Apply guards globally for authentication so every route is protected by default. Use the `@Public()` decorator to opt out.
