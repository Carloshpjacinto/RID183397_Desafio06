import express, {Express} from 'express';
import { AppDataSource } from './typeorm/data-source';
import routes from './routes';

const app:Express = express();

app.use(express.json());
app.use(routes)

const port:number = Number(process.env.PORT)

AppDataSource.initialize().then(() => {

    app.listen(port, () => {

        console.log(`Rodando o servidor na porta 3000`)
    })

    console.log("Banco de dados inicializado")

}).catch((erro) => {

    console.error("Erro ao iniciar o banco de dados", erro)
})
