import {IEndereco} from "../models/IEndereco"
import { Role } from "../utils/EnumRole";

export interface ISerializacao{

    id: number;
    nome: string;
    role: Role;
    email: string;
    endereco: IEndereco;
};
