import { Router } from "express";
import PedidoController from "../controller/PedidoController"

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes.post("/",pedidoController.create);

export default pedidoRoutes;
