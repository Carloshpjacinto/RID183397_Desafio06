import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";
import { PedidoRepository } from "../../pedidos/repositories/PedidoRepository";
import { ProdutoRepository } from "../../produtos/repositories/ProdutoRepository";
import { ClienteRepository } from "../../clientes/repositories/ClienteRepository";

export default class VendaController{

    public async create(req:Request, res:Response): Promise<Response>{

        const {id_pedido} = req.body;

        const codVenda = Math.floor(Math.random() * 99999);

        const pedido = await PedidoRepository.findOne({where: {id: id_pedido}, relations: ["produto"],})
        
        if(!pedido){
        
            throw new Error("Pedido não encontrado")
        }

        const produto = await ProdutoRepository.findOne({where: {id: pedido.produto.id}})

        if(!produto){
        
            throw new Error("Produto não encontrado")
        }

        const cliente = await ClienteRepository.findOne({where: {id: pedido.produto.id}})

        if(!cliente){
        
            throw new Error("Produto não encontrado")
        }
        
        const preco = produto.preco
        
        const desconto = produto.desconto
        
        const desconto_replace = desconto.replace('%', '')
        const desconto_numero = Number(desconto_replace)
        
        const valorFinalVenda = ((preco - (preco * (desconto_numero / 100))) * pedido.qtd_produto_pedido)

        const criandoVenda = new CriandoVendaServece();

        const venda = await criandoVenda.execute({

            cod_venda: codVenda,
            valor_venda: valorFinalVenda,
            id_pedido
        })

        const serializacao = {

            id: venda.id,
            codVenda: codVenda,
            produtos: {
                nomeProduto: produto.nome_produto,
                quantidadeProduto: pedido.qtd_produto_pedido,
                precoProdutoUnidade: produto.preco,
                descontoProdutos: produto.desconto,
                precoFinal: valorFinalVenda,
            },
            cliente:{
                nomeCliente: cliente.nome_cliente,
                email: cliente.email,
                endereco: {
                    logradouro: cliente.logradouro,
                    rua: cliente.endereco,
                    numero: cliente.numero_endereco,
                    cep: cliente.cep
                }
            }
        }

        return res.status(201).json(serializacao)
    }
}
