import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsUserService } from './appointments-user.service';

describe('AppointmentsUserService', () => {
  let service: AppointmentsUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsUserService],
    }).compile();

    service = module.get<AppointmentsUserService>(AppointmentsUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
