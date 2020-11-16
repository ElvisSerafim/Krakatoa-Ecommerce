import { CreateContatoDto } from './dto/create-contato.dto';
import { Contato } from './schemas/contato.schema';
import { Model } from 'mongoose';
export declare class ContatoService {
    private contatoModel;
    constructor(contatoModel: Model<Contato>);
    createContato(createContatoDto: CreateContatoDto): Promise<void>;
}
