import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserDropUsernameColumn1676010354178
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        type: 'varchar',
        name: 'username',
      })
    );
  }
}
