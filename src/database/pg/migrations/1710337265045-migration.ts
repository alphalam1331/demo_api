import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710337265045 implements MigrationInterface {
  name = 'Migration1710337265045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, CONSTRAINT "UQ_NAMES" UNIQUE ("firstName", "middleName", "lastName"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "score" integer NOT NULL, "bookId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "publishDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_TITLE" UNIQUE ("title"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "published" ("authorId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_ca8a804eb77326e146c64d864cb" PRIMARY KEY ("authorId", "bookId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18611cf1c79c970257ea5b3f9f" ON "published" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8772f7f8d2b0243ee6c45a0877" ON "published" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "written_by" ("bookId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_53f74d301fb2661350cdc94a196" PRIMARY KEY ("bookId", "authorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f1369d50c12bd2225ff710f43" ON "written_by" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f145b96f7780ebfa9f403c85b0" ON "written_by" ("authorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "published" ADD CONSTRAINT "FK_18611cf1c79c970257ea5b3f9f7" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "published" ADD CONSTRAINT "FK_8772f7f8d2b0243ee6c45a0877c" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "written_by" ADD CONSTRAINT "FK_1f1369d50c12bd2225ff710f431" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "written_by" ADD CONSTRAINT "FK_f145b96f7780ebfa9f403c85b0b" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "written_by" DROP CONSTRAINT "FK_f145b96f7780ebfa9f403c85b0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "written_by" DROP CONSTRAINT "FK_1f1369d50c12bd2225ff710f431"`,
    );
    await queryRunner.query(
      `ALTER TABLE "published" DROP CONSTRAINT "FK_8772f7f8d2b0243ee6c45a0877c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "published" DROP CONSTRAINT "FK_18611cf1c79c970257ea5b3f9f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f145b96f7780ebfa9f403c85b0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1f1369d50c12bd2225ff710f43"`,
    );
    await queryRunner.query(`DROP TABLE "written_by"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8772f7f8d2b0243ee6c45a0877"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_18611cf1c79c970257ea5b3f9f"`,
    );
    await queryRunner.query(`DROP TABLE "published"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
