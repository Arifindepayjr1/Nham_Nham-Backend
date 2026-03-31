common/
Shared utilities used across all modules in the application. Code placed here is not specific to any feature — it's reusable infrastructure.

Subfolders
decorators/
Custom decorators that add metadata or simplify repetitive patterns.

Examples:

@CurrentUser() — extracts the authenticated user from the request
@Roles('admin', 'driver') — marks which roles can access an endpoint
@Public() — marks an endpoint as publicly accessible (no auth required)

// Example: current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage in a controller:
@Get('profile')
getProfile(@CurrentUser() user) {
  return user;
}
filters/
Exception filters that catch errors and return consistent error responses to the Flutter app.

Examples:

HttpExceptionFilter — formats all HTTP errors into a standard JSON shape
DatabaseExceptionFilter — catches PostgreSQL errors (duplicate key, constraint violations)

// Standard error response shape for Flutter:
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
Why this matters: Your Flutter app should always receive errors in the same format, so you only need one error handler on the frontend.

guards/
Guards decide who can access an endpoint. They run BEFORE the controller method.

Examples:

JwtAuthGuard — checks if the request has a valid JWT token
RolesGuard — checks if the user has the required role (admin, customer, driver)

// Usage in a controller:
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Delete('users/:id')
deleteUser(@Param('id') id: string) { ... }
interceptors/
Interceptors transform requests before they hit the controller or responses before they're sent to the client.

Examples:

TransformInterceptor — wraps all responses in { data: ..., message: '...' }
LoggingInterceptor — logs request method, URL, and response time
TimeoutInterceptor — cancels requests that take too long

// Example: every response automatically wrapped
// Before: { id: 1, email: "<test@test.com>" }
// After:  { data: { id: 1, email: "<test@test.com>" }, message: "success" }
pipes/
Pipes validate and transform incoming data before it reaches the controller.

Examples:

ValidationPipe — validates DTOs using class-validator decorators
ParseUUIDPipe — ensures a parameter is a valid UUID
TrimPipe — trims whitespace from string inputs

// Usage: automatically validate request body
@Post('register')
register(@Body(ValidationPipe) dto: RegisterDto) { ... }
Rules for This Folder
Only shared code — if it's only used by one module, keep it in that module
No business logic — guards check permissions, they don't create orders
Keep it simple — each file does one thing
Naming convention — kebab-case.type.ts (e.g., jwt-auth.guard.ts, current-user.decorator.ts)
