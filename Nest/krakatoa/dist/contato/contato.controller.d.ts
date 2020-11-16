import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
export declare class ContatoController {
    private contatoService;
    constructor(contatoService: ContatoService);
    createContato(createContatoDto: CreateContatoDto): Promise<void>;
}
