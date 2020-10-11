'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = `
    CREATE TABLE IF NOT EXISTS "public"."clientes" ("id" BIGSERIAL,
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
                      "apellido" TEXT NOT NULL,
                                      "x" INTEGER, "y" INTEGER, "planta" INTEGER NOT NULL DEFAULT 1,
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

CREATE TABLE IF NOT EXISTS "public"."reservas"
  ("id" BIGSERIAL,
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
