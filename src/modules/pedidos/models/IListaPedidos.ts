import { ISerializacao } from "../../clientes/models/ISerializacao";
import { IProduto } from "./IProduto";

export interface IListaPedidos{

    id: number;
    cod_pedido: number;
    cliente: ISerializacao;
    produto: IProduto
}
