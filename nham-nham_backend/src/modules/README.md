modules/
Feature modules — the core of your application. Each subfolder represents one domain/feature of Nham Nham, containing everything related to that feature.

Structure
Each module follows this pattern:

modules/
├── auth/                        # Authentication & authorization
│   ├── dto/
│   │   ├── login.dto.ts         # Login request validation
│   │   └── register.dto.ts      # Register request validation
│   ├── strategies/
│   │   └── jwt.strategy.ts      # JWT token validation strategy
│   ├── auth.controller.ts       # Routes: POST /auth/login, POST /auth/register
│   ├── auth.module.ts           # Module definition & imports
│   └── auth.service.ts          # Business logic + raw SQL queries
│
├── users/                       # User management
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── users.controller.ts      # Routes: GET/POST/PATCH/DELETE /users
│   ├── users.module.ts
│   └── users.service.ts         # Raw SQL queries for users
│
├── restaurants/                 # Restaurant management
│   ├── dto/
│   ├── restaurants.controller.ts
│   ├── restaurants.module.ts
│   └── restaurants.service.ts
│
├── menu-items/                  # Menu items for restaurants
│   ├── dto/
│   ├── menu-items.controller.ts
│   ├── menu-items.module.ts
│   └── menu-items.service.ts
│
├── orders/                      # Order management
│   ├── dto/
│   ├── orders.controller.ts
│   ├── orders.module.ts
│   └── orders.service.ts
│
└── ...                          # Add more modules as needed
Files in Each Module
File Purpose Example
*.module.ts Declares the module, imports dependencies UsersModule imports TypeOrmModule
*.controller.ts Defines API routes (endpoints) GET /api/v1/users, POST /api/v1/users
*.service.ts Business logic + raw SQL queries findAll(), create(), update()
dto/*.dto.ts Request validation (what the Flutter app sends) CreateUserDto { email, password, name }
Example Module

// users/users.service.ts — raw SQL queries
@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async findAll() {
    return this.dataSource.query('SELECT id, email, first_name FROM users');
  }

  async findById(id: string) {
    const rows = await this.dataSource.query(
      'SELECT * FROM users WHERE id = $1', [id]
    );
    return rows[0] || null;
  }

  async create(dto: CreateUserDto) {
    const result = await this.dataSource.query(
      'INSERT INTO users (email, password, first_name) VALUES ($1, $2, $3) RETURNING *',
      [dto.email, dto.password, dto.firstName],
    );
    return result[0];
  }
}

// users/users.controller.ts — API routes
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}

// users/dto/create-user.dto.ts — request validation
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;
}
Creating a New Module
When you need a new feature:

Create a folder: modules/your-feature/
Create 3 files minimum:
your-feature.module.ts
your-feature.controller.ts
your-feature.service.ts
Create dto/ folder with request validation classes
Register the module in app.module.ts
Create a migration for any new database tables
Or use the NestJS CLI:

nest generate module modules/your-feature
nest generate controller modules/your-feature
nest generate service modules/your-feature
Rules
One module per feature/domain — don't mix users and orders logic
Keep controllers thin — controllers only route, services do the work
Validate all input — every endpoint should use DTOs with validation
Use raw SQL in services — this.dataSource.query(...) with parameterized queries ($1, $2)
Never trust user input — always use parameterized queries to prevent SQL injection
Naming convention — folder and files in kebab-case, classes in PascalCase
