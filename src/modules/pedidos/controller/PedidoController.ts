import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";
import { ClienteRepository } from "../../clientes/repositories/ClienteRepository";
import { ProdutoRepository } from "../../produtos/repositories/ProdutoRepository";

export default class PedidoController{

    public async create(req:Request, res:Response): Promise<Response>{

        const codPedido = Math.floor(Math.random() * 99999)

        const {qtd_produto_pedido, id_cliente, id_produto} = req.body;

        const clienteRepository = await ClienteRepository.findOne({where: {id: id_cliente}})
        
        if(!clienteRepository){
                
            throw new Error("Produto não encontrado")
        }

        const produtoRepository = await ProdutoRepository.findOne({where: {id: id_produto}})
        
        if(!produtoRepository){
                
            throw new Error("Produto não encontrado")
        }

        const criandoPedido = new CriandoPedidoServece();

        const pedido = await criandoPedido.execute({

            cod_pedido: codPedido,
            qtd_produto_pedido,
            id_cliente,
            id_produto
        })

        const serializacao = {

            id: pedido.id,
            codPedido: codPedido,

            cliente: {
                nomeCliente: clienteRepository.nome_cliente,
                email: clienteRepository.email,
                endereco: {
                    logradouro: clienteRepository.logradouro,
                    endereco: clienteRepository.endereco,
                    cep: clienteRepository.cep,
                    numeroEndereco: clienteRepository.numero_endereco
                }
            },

            produto: {
                qtd_produto_pedido,
                nomeProduto: produtoRepository.nome_produto,
                categoria: produtoRepository.categoria,
                preco: produtoRepository.preco,
                desconto: produtoRepository.desconto
            }
        }
        return res.status(201).json(serializacao)
    }
}
