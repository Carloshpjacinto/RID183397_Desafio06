import { Router } from "express";
import ClienteController from "../controller/ClienteController"

const clienteRouter = Router();
const clienteController = new ClienteController();

clienteRouter.post("/",clienteController.create);

clienteRouter.get("/", clienteController.index)

clienteRouter.get("/:id", clienteController.show)


export default clienteRouter;
