import { Router } from 'express';
import ClienteController from "../controller/ClienteController";
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const clienteRouter = Router();
const clienteController = new ClienteController();

clienteRouter.use(isAuthenticated)
clienteRouter.post("/", clienteController.create);

clienteRouter.get("/", clienteController.index);

clienteRouter.get("/:id", clienteController.show);

export default clienteRouter;
