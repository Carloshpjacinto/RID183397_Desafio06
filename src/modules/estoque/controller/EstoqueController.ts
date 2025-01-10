import { Request, Response } from "express";
import CriandoEstoqueService from "../services/CriandoEstoqueService";
import ListaEstoqueService from "../services/ListaEstoqueService"
import EstoqueIdService from "../services/EstoqueIdService"

export default class EstoqueController{

        public async index(req: Request, res: Response): Promise<Response>{
    
            try{
                const listaEstoque = new ListaEstoqueService()
    
                const estoque = await listaEstoque.execute();
    
                const listaSerializacao = estoque.map((estoque) => ({
    
                    id: estoque.id,
                    estoque: estoque.qtd_estoque
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
        
                const estoqueIdService = new EstoqueIdService()
        
                const estoque = await estoqueIdService.execute({id: idNumber})
        
                return res.json(estoque)
    
            } catch(error){
    
                console.error('Erro ao processar a venda:', error);
                return res.status(500).json({ mensagem: 'Erro interno no servidor'});
            }
        }

    public async create(req:Request, res:Response): Promise<Response>{

        const {qtd_estoque} = req.body;

        const criandoEstoue = new CriandoEstoqueService();

        const estoque = await criandoEstoue.execute({

            qtd_estoque
        })

        return res.status(201).json({mensagem: `Estoque de id: ${estoque.id} criado com sucesso`})
    }
}
