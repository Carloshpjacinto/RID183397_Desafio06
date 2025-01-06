import { Router } from "express";
import VendasController from "../controller/VendaController"

const vendaRouter = Router();
const vendaController = new VendasController();

vendaRouter.post("/",vendaController.create);

export default vendaRouter;
