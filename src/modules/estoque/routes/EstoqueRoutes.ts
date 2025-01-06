import { Router } from "express";
import EstoqueController from "../controller/EstoqueController"

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes.post("/estoque",estoqueController.create);

export default estoqueRoutes;
