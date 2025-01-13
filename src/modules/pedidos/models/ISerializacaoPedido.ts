import { ISerializacao } from "../../clientes/models/ISerializacao";
import { IProduto } from "./IProduto";

export interface IserializacaoPedido {

    id: number;
    cod_pedido: number;
    cliente: ISerializacao;
    produto: IProduto;
};
