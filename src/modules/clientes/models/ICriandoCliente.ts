import { Role } from "../utils/EnumRole";

export interface IcriandoCliente{

    nome_cliente: string;
    role:Role;
    email: string;
    senha: string;
    logradouro: string;
    endereco: string;
    cep: string;
    numero_endereco: number;
};
