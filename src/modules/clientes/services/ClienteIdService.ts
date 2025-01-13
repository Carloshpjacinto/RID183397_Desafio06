import 'reflect-metadata';
import { ISerializacao } from "../models/ISerializacao";
import { IId } from "../models/IId";
import { Cliente } from "../entities/Clientes";
import { ClienteRepository } from "../repositories/ClienteRepository";

export default class ClienteIdService{

    public async execute({id}: IId): Promise<Cliente | ISerializacao | string>{

        const cliente = await ClienteRepository.findById(id);

        if(!cliente){

            return ('Cliente não encontrado');
        };

        const serializacao:ISerializacao = {
    
            id: cliente.id,
            nome: cliente.nome_cliente,
            email: cliente.email,
            endereco: {
                logradouro: cliente.logradouro,
                endereco: cliente.endereco,
                cep: cliente.cep,
                numero: cliente.numero_endereco
            }
        };

        return serializacao;
    };
};
