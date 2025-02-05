import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Role } from '../../modules/clientes/utils/EnumRole';

export class CreateClientes1736136707597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clientes',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_cliente',
                        type: 'varchar',
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                    },
                    {
                        name: 'logradouro',
                        type: 'varchar',
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                    },
                    {
                        name: 'numero_endereco',
                        type: 'integer',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                    }
                ]
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clientes');
    };
};
