import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();
  });

  describe('getData', () => {
    it('should return version', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ version: '0.0.0' });
    });
  });
});
