import { Router } from "express";
import ProdutoController from "../controller/ProdutoController"

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.post("/",produtoController.create);

export default produtoRouter;
