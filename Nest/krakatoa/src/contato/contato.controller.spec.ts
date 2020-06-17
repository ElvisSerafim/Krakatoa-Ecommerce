import { Test, TestingModule } from '@nestjs/testing';
import { ContatoController } from './contato.controller';

describe('Contato Controller', () => {
  let controller: ContatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContatoController],
    }).compile();

    controller = module.get<ContatoController>(ContatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
