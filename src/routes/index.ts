import ClienteRouter from "../modules/clientes/routes/ClientesRoutes";
import EstoqueRouter from "../modules/estoque/routes/EstoqueRoutes";
import PedidoRouter from "../modules/pedidos/routes/PedidosRoutes";
import ProdutoRouter from "../modules/produtos/routes/ProdutosRoutes";
import VendaRouter from "../modules/vendas/routes/VendasRoutes";
import { Router } from 'express';

const routes = Router();

routes.use('/cliente', ClienteRouter);
routes.use('/estoque', EstoqueRouter);
routes.use('/pedido', PedidoRouter);
routes.use('/produto', ProdutoRouter);
routes.use('/venda', VendaRouter);

export default routes;
