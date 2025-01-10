import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";
import { ClienteRepository } from "../../clientes/repositories/ClienteRepository";
import { ProdutoRepository } from "../../produtos/repositories/ProdutoRepository";
import { EstoqueRepository } from "../../estoque/repositories/EstoqueRepository";
import ListaPedidosService from "../services/ListaPedidosService";
import PedidoIdService from "../services/PedidoIdService";

export default class PedidoController{

    public async index(req: Request, res: Response): Promise<Response>{
        
        try{
            const listaPedidos = new ListaPedidosService()
        
            const pedido = await listaPedidos.execute();
        
            const listaSerializacao = pedido.map((pedido) => ({
                
                id: pedido.id,
                cod_pedido: pedido.cod_pedido,
                data: pedido.data_pedido,
                se: pedido.qtd_produto_pedido
            }))
            
            return res.json(listaSerializacao)
        
        } catch(error){
        
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
        
    }

    public async show(req: Request, res: Response): Promise<Response>{
        
        try{
            const { id } = req.params;
        
            const idNumber = Number(id)
            
            const pedidoIdService = new PedidoIdService()
            
            const pedido = await pedidoIdService.execute({id: idNumber})
            
            return res.json(pedido)
        
        } catch(error){
        
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const codPedido = Math.floor(Math.random() * 99999)

            const {qtd_produto_pedido, id_cliente, id_produto} = req.body;
    
            const clienteRepository = await ClienteRepository.findOne({where: {id: id_cliente}})
            
            if(!clienteRepository){
                    
                return res.json({mensagem: "Cliente não encontrado"})
            }
    
            const produtoRepository = await ProdutoRepository.findOne({where: {id: id_produto}, relations: ["estoque"]})
            
            if(!produtoRepository){
                    
                return res.json({mensagem: "Produto não encontrado"})
            }

            const estoque = await EstoqueRepository.findOne({where: {id: produtoRepository.estoque.id}})
                
            if(!estoque){
                        
                return res.json({mensagem: "Estoque não encontrado"})
            }

            const qtdEstoque = Number(estoque.qtd_estoque)
    
            const qtdPedido = Number(qtd_produto_pedido)

            if(qtdEstoque == 0){
    
                return res.json({mensagem: "Esse produto já não está mais disponivel"})
    
            }else if(qtdEstoque < qtdPedido){
    
                return res.json({mensagem: "Essa quantidade não está disponivel para venda"}) 
            }
    
            const criandoPedido = new CriandoPedidoServece();
    
            const pedido = await criandoPedido.execute({
    
                cod_pedido: codPedido,
                qtd_produto_pedido,
                id_cliente,
                id_produto
            })

            const valorAtualizadoEstoque = qtdEstoque - qtdPedido
    
            await EstoqueRepository.atualizacaoEstoque(produtoRepository.estoque.id, {
    
                qtd_estoque: valorAtualizadoEstoque
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
                        numero: clienteRepository.numero_endereco
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

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
