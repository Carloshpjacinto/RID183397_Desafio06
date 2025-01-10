import { Router } from "express";
import EstoqueController from "../controller/EstoqueController"

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes.post("/",estoqueController.create);

estoqueRoutes.get("/", estoqueController.index);

estoqueRoutes.get("/:id", estoqueController.show);

export default estoqueRoutes;
