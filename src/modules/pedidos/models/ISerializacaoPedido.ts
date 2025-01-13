import { ISerializacao } from "../../clientes/models/ISerializacao";
import { IProduto } from "./IProduto";

export interface IserializacaoPedido {

    id: number;
    codPedido: number;
    cliente: ISerializacao;
    produto: IProduto
}
