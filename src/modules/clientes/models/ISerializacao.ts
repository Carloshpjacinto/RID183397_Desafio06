import {IEndereco} from "../models/IEndereco"

export interface ISerializacao{

    id: number;
    nome: string;
    role: string;
    email: string;
    endereco: IEndereco;
};
