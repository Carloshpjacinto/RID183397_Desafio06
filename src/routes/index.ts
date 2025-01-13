import clienteRouter from "../modules/clientes/routes/ClientesRoutes";
import estoqueRoutes from "../modules/estoque/routes/EstoqueRoutes";
import pedidoRoutes from "../modules/pedidos/routes/PedidosRoutes";
import produtoRouter from "../modules/produtos/routes/ProdutosRoutes";
import vendaRouter from "../modules/vendas/routes/VendasRoutes";
import { Router } from 'express';

const routes = Router();

routes.use('/clientes', clienteRouter);
routes.use('/estoque', estoqueRoutes);
routes.use('/pedidos', pedidoRoutes);
routes.use('/produtos', produtoRouter);
routes.use('/vendas', vendaRouter);

export default routes;
