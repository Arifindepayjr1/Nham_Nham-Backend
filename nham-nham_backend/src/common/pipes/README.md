pipes/
Pipes validate and transform incoming data before it reaches the controller. If validation fails, the request is rejected with a 400 Bad Request before any business logic runs.

How Pipes Work

Flutter sends data → Pipe (validate & transform) → Controller (safe to use)
                         ↓ INVALID
                   400 Bad Request
Built-in Pipes (from NestJS)
You'll use these most often — no need to create custom versions:

// ValidationPipe — validates DTOs using class-validator decorators
@Post('register')
register(@Body(ValidationPipe) dto: RegisterDto) { ... }

// ParseUUIDPipe — ensures param is a valid UUID
@Get(':id')
findOne(@Param('id', ParseUUIDPipe) id: string) { ... }

// ParseIntPipe — ensures param is a number
@Get('page/:num')
getPage(@Param('num', ParseIntPipe) num: number) { ... }
Custom Pipes for Nham Nham
TrimPipe — Trim whitespace from strings

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

// " <user@email.com> " becomes "<user@email.com>"
Global Validation Setup
In main.ts, enable validation globally so every endpoint validates automatically:

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,       // strip unknown properties
  forbidNonWhitelisted: true,  // throw if unknown properties sent
  transform: true,       // auto-transform types
}));
Rules
File naming: kebab-case.pipe.ts
Use built-in pipes first — only create custom pipes when needed
Validation lives in DTOs — pipes just trigger the validation, the rules are in DTO files using decorators like @IsEmail(), @MinLength(8)
Enable globally — don't repeat ValidationPipe on every endpoint
