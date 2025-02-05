import { Router } from 'express';
import ClienteController from "../controller/ClienteController";
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';
import { authorize } from '../../../shared/middlewares/authRoutes';
import { Role } from '../utils/EnumRole';

const clienteRouter = Router();
const clienteController = new ClienteController();

clienteRouter.use(isAuthenticated)
clienteRouter.post("/", authorize([Role[0]]), clienteController.create);

clienteRouter.get("/", clienteController.index);

clienteRouter.get("/:id", clienteController.show);

export default clienteRouter;
