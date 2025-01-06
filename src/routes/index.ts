import clienteRouter from "../modules/clientes/routes/ClientesRoutes";
import estoqueRoutes from "../modules/estoque/routes/EstoqueRoutes";
import pedidoRoutes from "../modules/pedidos/routes/PedidosRoutes";
import produtoRouter from "../modules/produtos/routes/ProdutosRoutes";
import vendaRouter from "../modules/vendas/routes/VendasRoutes";
import { Router } from 'express';

const routes = Router();

routes.use('/cliente', clienteRouter);
routes.use('/estoque', estoqueRoutes);
routes.use('/pedido', pedidoRoutes);
routes.use('/produto', produtoRouter);
routes.use('/venda', vendaRouter);

export default routes;
