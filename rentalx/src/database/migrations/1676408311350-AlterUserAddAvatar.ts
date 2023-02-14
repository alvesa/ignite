import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAddAvatar1676408311350 implements MigrationInterface {
  name = 'AlterUserAddAvatar1676408311350';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
