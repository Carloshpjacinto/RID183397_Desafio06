import { IserializacaoPedido } from "../../pedidos/models/ISerializacaoPedido";

export interface ISerializacaoVenda{

    id: number;
    cod_venda: number;
    pedido: IserializacaoPedido;
    valor_venda: number;
    data_venda: Date;
};
