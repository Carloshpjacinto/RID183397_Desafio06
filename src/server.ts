import express, {Express} from 'express';
import { AppDataSource } from "./typeorm/data-source";
import routes from './routes';
import cors from 'cors'
import { errors } from 'celebrate';
import ErrorHandlerMiddleware from './shared/errors/ErrorHandlerMiddleware';

const app:Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors())
app.use(ErrorHandlerMiddleware.handleError)

const port:number = Number(process.env.PORT);

AppDataSource.initialize().then(() => {

    app.listen(3000, () => {

        console.log(`Rodando o servidor na porta ${port}`);
    })

    console.log("Banco de dados inicializado");

}).catch((erro) => {

    console.error("Erro ao iniciar o banco de dados", erro);
});
