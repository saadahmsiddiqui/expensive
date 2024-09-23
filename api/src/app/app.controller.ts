import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData() {
    return { version: '0.0.1' };
  }
}
