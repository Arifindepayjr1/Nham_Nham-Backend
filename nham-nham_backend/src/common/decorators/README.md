decorators/
Custom decorators that simplify repetitive patterns in your controllers and services.

What Are Decorators?
Decorators are annotations you place on classes, methods, or parameters to add extra behavior without modifying the original code.

Common Decorators for Nham Nham
@CurrentUser() — Get the logged-in user

// current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // extracted from JWT token
  },
);

// Usage:
@Get('my-orders')
getMyOrders(@CurrentUser() user) {
  return this.ordersService.findByUser(user.id);
}
@Roles() — Restrict access by role

// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Usage:
@Roles('admin', 'restaurant_owner')
@Get('dashboard')
getDashboard() { ... }
@Public() — Skip authentication

// public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

// Usage:
@Public()
@Get('restaurants')
getRestaurants() { ... }  // anyone can browse restaurants
Rules
File naming: kebab-case.decorator.ts (e.g., current-user.decorator.ts)
Keep decorators simple — they should add metadata or extract data, not contain business logic
Export from an index.ts for clean imports: import { CurrentUser, Roles } from '@common/decorators'
