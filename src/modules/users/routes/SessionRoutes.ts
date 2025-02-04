import { Router } from "express";
import SessionsController from "../controllers/CreateSessionController";
import { sessionSchemaValidation } from "../schemas/SessionSchema";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post("/", sessionSchemaValidation, sessionsController.create);

export default sessionsRouter
