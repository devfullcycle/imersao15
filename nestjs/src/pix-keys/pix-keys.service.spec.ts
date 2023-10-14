import { Test, TestingModule } from '@nestjs/testing';
import { PixKeysService } from './pix-keys.service';

describe('PixKeysService', () => {
  let service: PixKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PixKeysService],
    }).compile();

    service = module.get<PixKeysService>(PixKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
