require("dotenv").config();

module.exports = {
  dbUrl: process.env.DATABASE_URL_SERVICE,
  db: {
    //"ssl": { rejectUnauthorized: false }
  },
  transforms: [
    {
      mode: "sql",
      include: "**/*.sql",
      emitTemplate: "{{dir}}/{{name}}.queries.ts",
    },
  ],
  srcDir: "./src/",
  failOnError: false,
  camelCaseColumnNames: false,
};
