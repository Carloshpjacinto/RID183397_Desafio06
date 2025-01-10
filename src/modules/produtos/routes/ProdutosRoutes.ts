import { Router } from "express";
import ProdutoController from "../controller/ProdutoController"

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.post("/",produtoController.create);

produtoRouter.get("/", produtoController.index);

produtoRouter.get("/:id", produtoController.show);

export default produtoRouter;
