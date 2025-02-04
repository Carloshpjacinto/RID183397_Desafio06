import { Cliente } from "../../clientes/entities/Clientes";

export interface IResponse{

    user: Cliente;
    token:string
}
