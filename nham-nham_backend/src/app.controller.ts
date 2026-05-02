import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';

const indexHtml = readFileSync(
    join(__dirname, "..", "public", "index.html"),
    'utf-8'
);

@Controller()
export class AppController {
    @Get()
     index(@Res() res: Response) {
        return res
            .setHeader('Content-Type', 'text/html')
            .send(indexHtml);
    }
}