import {IEndereco} from "../models/IEndereco"

export interface ISerializacao{

    nome: string,
    email: string,
    endereco: IEndereco
}
