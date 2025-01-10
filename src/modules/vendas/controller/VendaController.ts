import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";
import { PedidoRepository } from "../../pedidos/repositories/PedidoRepository";
import { ProdutoRepository } from "../../produtos/repositories/ProdutoRepository";
import { ClienteRepository } from "../../clientes/repositories/ClienteRepository";
import { EstoqueRepository } from "../../estoque/repositories/EstoqueRepository";
import { VendasRepository } from "../repositories/VendasRepository";
import ListaVendasService from "../services/ListaVendasService";
import VendaIdService from "../services/VendaIdService";

export default class VendaController{

    public async index(req: Request, res: Response): Promise<Response>{
                
        try{
            const listaVendas = new ListaVendasService()
                
            const vendas = await listaVendas.execute();
                
            const listaSerializacao = vendas.map((venda) => ({
                        
                id: venda.id,
                cod_venda: venda.cod_venda,
                valorVenda: venda.valor_venda,
                data_venda: venda.data_venda
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
                    
            const vendaIdService = new VendaIdService()
                    
            const venda = await vendaIdService.execute({id: idNumber})
                    
            return res.json(venda)
                
        } catch(error){
                
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {id_pedido} = req.body;

            const codVenda = Math.floor(Math.random() * 99999);
    
            const pedido = await PedidoRepository.findOne({where: {id: id_pedido}, relations: ["produto", "cliente"],})

            const verificacaoPedido = await VendasRepository.findOne({where: {pedido: {id: id_pedido}}, relations: ["pedido"]})
            
            if(!pedido){
            
                return res.json({mensagem: 'O pedido não foi encontrado'})
            }

            if(verificacaoPedido){

                return res.json({mensagem: 'O pedido informado já foi processado para venda'})
            }
    
            const produto = await ProdutoRepository.findOne({where: {id: pedido.produto.id}, relations: ["estoque"]})
    
            if(!produto){
            
                return res.json("Produto não encontrado")
            }
    
            const cliente = await ClienteRepository.findOne({where: {id: pedido.cliente.id}})
    
            if(!cliente){
            
                return res.json("Cliente não encontrado")
            }
    
            const estoque = await EstoqueRepository.findOne({where: {id: produto.estoque.id}})
    
            if(!estoque){
            
                return res.json("Estoque não encontrado")
            }
            
            const preco = produto.preco
            
            const desconto = produto.desconto
            
            const desconto_replace = desconto.replace('%', '')
            const desconto_numero = Number(desconto_replace)

            let valorFinalVenda = 0

            if(desconto_numero != 0){

                valorFinalVenda = ((preco - (preco * (desconto_numero / 100))) * pedido.qtd_produto_pedido)

            }else{

                valorFinalVenda = (preco * pedido.qtd_produto_pedido)
            }
    
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
                    nome: produto.nome_produto,
                    quantidade: pedido.qtd_produto_pedido,
                    precoUnitario: produto.preco,
                    desconto: produto.desconto,
                    precoFinal: valorFinalVenda,
                },
                cliente:{
                    nome: cliente.nome_cliente,
                    email: cliente.email,
                    endereco: {
                        logradouro: cliente.logradouro,
                        endereco: cliente.endereco,
                        numero: cliente.numero_endereco,
                        cep: cliente.cep
                    }
                }
            }
    
            return res.status(201).json(serializacao)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
