import { Test, TestingModule } from '@nestjs/testing';
import { PixKeysController } from './pix-keys.controller';
import { PixKeysService } from './pix-keys.service';

describe('PixKeysController', () => {
  let controller: PixKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PixKeysController],
      providers: [PixKeysService],
    }).compile();

    controller = module.get<PixKeysController>(PixKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
