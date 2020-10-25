'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = `CREATE TABLE IF NOT EXISTS "public"."clientes" ("id" BIGSERIAL,
                                                                 "nombre" TEXT NOT NULL,
                                                                 "apellido" TEXT NOT NULL,
                                                                 "ci" TEXT UNIQUE,
                                                                 "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                                                 "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                                                 PRIMARY KEY ("id"));


    SELECT i.relname AS name,
           ix.indisprimary AS PRIMARY,
           ix.indisunique AS UNIQUE,
           ix.indkey AS indkey,
           array_agg(a.attnum) AS column_indexes,
           array_agg(a.attname) AS column_names,
           pg_get_indexdef(ix.indexrelid) AS definition
    FROM pg_class t,
         pg_class i,
         pg_index ix,
         pg_attribute a,
         pg_namespace s
    WHERE t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND t.relkind = 'r'
      AND t.relname = 'clientes'
      AND s.oid = t.relnamespace
      AND s.nspname = 'public'
    GROUP BY i.relname,
             ix.indexrelid,
             ix.indisprimary,
             ix.indisunique,
             ix.indkey
    ORDER BY i.relname;


    DROP TABLE IF EXISTS "public"."restaurantes" CASCADE;


    CREATE TABLE IF NOT EXISTS "public"."restaurantes" ("id" BIGSERIAL,
                                                        "nombre" TEXT NOT NULL,
                                                        "descripcion" TEXT NOT NULL,
                                                        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                                                        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                                                        PRIMARY KEY ("id"));


    SELECT i.relname AS name,
           ix.indisprimary AS PRIMARY,
           ix.indisunique AS UNIQUE,
           ix.indkey AS indkey,
           array_agg(a.attnum) AS column_indexes,
           array_agg(a.attname) AS column_names,
           pg_get_indexdef(ix.indexrelid) AS definition
    FROM pg_class t,
         pg_class i,
         pg_index ix,
         pg_attribute a,
         pg_namespace s
    WHERE t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND t.relkind = 'r'
      AND t.relname = 'restaurantes'
      AND s.oid = t.relnamespace
      AND s.nspname = 'public'
    GROUP BY i.relname,
             ix.indexrelid,
             ix.indisprimary,
             ix.indisunique,
             ix.indkey
    ORDER BY i.relname;


    DROP TABLE IF EXISTS "public"."mesas" CASCADE;


    CREATE TABLE IF NOT EXISTS "public"."mesas"
    ("id" BIGSERIAL,
     "nombre" TEXT NOT NULL,
     "x" INTEGER NOT NULL,
     "y" INTEGER NOT NULL,
     "planta" INTEGER NOT NULL DEFAULT 1,
     "capacidad" INTEGER NOT NULL,
     "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
     "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
     "restaurante_id" BIGINT NOT NULL REFERENCES "public"."restaurantes" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
     PRIMARY KEY ("id"));


    SELECT i.relname AS name,
           ix.indisprimary AS PRIMARY,
           ix.indisunique AS UNIQUE,
           ix.indkey AS indkey,
           array_agg(a.attnum) AS column_indexes,
           array_agg(a.attname) AS column_names,
           pg_get_indexdef(ix.indexrelid) AS definition
    FROM pg_class t,
         pg_class i,
         pg_index ix,
         pg_attribute a,
         pg_namespace s
    WHERE t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND t.relkind = 'r'
      AND t.relname = 'mesas'
      AND s.oid = t.relnamespace
      AND s.nspname = 'public'
    GROUP BY i.relname,
             ix.indexrelid,
             ix.indisprimary,
             ix.indisunique,
             ix.indkey
    ORDER BY i.relname;


    DROP TABLE IF EXISTS "public"."reservas" CASCADE;


    SELECT t.typname enum_name,
           array_agg(e.enumlabel
                     ORDER BY enumsortorder) enum_value
    FROM pg_type t
             JOIN pg_enum e ON t.oid = e.enumtypid
             JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
      AND t.typname='enum_reservas_rangos'
    GROUP BY 1
    DROP TYPE IF EXISTS "public"."enum_reservas_rangos";

    CREATE TYPE "public"."enum_reservas_rangos" AS ENUM('12 a 13', '13 a 14', '14 a 15', '19 a 20', '20 a 21', '21 a 22', '22 a 23');

    WITH ranges AS
             (SELECT pg_range.rngtypid,
                     pg_type.typname AS rngtypname,
                     pg_type.typarray AS rngtyparray,
                     pg_range.rngsubtype
              FROM pg_range
                       LEFT OUTER JOIN pg_type ON pg_type.oid = pg_range.rngtypid)
    SELECT pg_type.typname,
           pg_type.typtype,
           pg_type.oid,
           pg_type.typarray,
           ranges.rngtypname,
           ranges.rngtypid,
           ranges.rngtyparray
    FROM pg_type
             LEFT OUTER JOIN ranges ON pg_type.oid = ranges.rngsubtype
    WHERE (pg_type.typtype IN('b',
                              'e'));


    CREATE TABLE IF NOT EXISTS "public"."reservas"
    ("id" BIGSERIAL,
     "fecha" DATE NOT NULL,
     "rangos" "public"."enum_reservas_rangos"[] NOT NULL,
     "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
     "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
     "mesa_id" BIGINT REFERENCES "public"."mesas" ("id") ON DELETE
         SET NULL ON UPDATE CASCADE,
     "cliente_id" BIGINT REFERENCES "public"."clientes" ("id") ON DELETE
         SET NULL ON UPDATE CASCADE,
     PRIMARY KEY ("id"));


    SELECT i.relname AS name,
           ix.indisprimary AS PRIMARY,
           ix.indisunique AS UNIQUE,
           ix.indkey AS indkey,
           array_agg(a.attnum) AS column_indexes,
           array_agg(a.attname) AS column_names,
           pg_get_indexdef(ix.indexrelid) AS definition
    FROM pg_class t,
         pg_class i,
         pg_index ix,
         pg_attribute a,
         pg_namespace s
    WHERE t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND t.relkind = 'r'
      AND t.relname = 'reservas'
      AND s.oid = t.relnamespace
      AND s.nspname = 'public'
    GROUP BY i.relname,
             ix.indexrelid,
             ix.indisprimary,
             ix.indisunique,
             ix.indkey
    ORDER BY i.relname;`;
    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    const sql = `DROP SCHEMA public CASCADE;`;
    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
