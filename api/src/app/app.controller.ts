import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { UsersService } from '../services/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  getData() {
    return this.usersService.getUsers();
  }
}
