import { Router } from 'express';
import PedidoController from "../controller/PedidoController";

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes.post("/", pedidoController.create);

pedidoRoutes.get("/", pedidoController.index);

pedidoRoutes.get("/:id", pedidoController.show);

export default pedidoRoutes;
