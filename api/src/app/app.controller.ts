import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getData() {
    return { version: '0.0.1' };
  }
}
