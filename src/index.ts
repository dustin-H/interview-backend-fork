import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { appRouter } from "./router/index.js";
import { createOpenApiExpressMiddleware, generateOpenApiDocument } from "trpc-openapi";
import { createDocs } from "~/utils/createDocs.js";
import { createContext } from "~/utils/context.js";
import { asyncLocalStorage, logger } from "./utils/logger.js";
import { customAlphabet } from "nanoid";

// project related imports
import { getConfig } from "~/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(async (req, res, next) => {
  const requestId = (req.headers["x-request-id"] as string) ?? customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6)();
  await asyncLocalStorage.run({ requestId }, async () => {
    logger.debug(`Request: [client: ${req.ip}] ${req.url}`);
    return next();
  });
});

app.use(cors({ origin: "*" })); // TODO: Add required cors stuff

if (getConfig("enableDocsClient")) {
  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: "Interview API V1",
    version: "0.0.1",
    baseUrl: `${getConfig("server.baseUrl")}:${getConfig("server.port")}/api/v1`,
  });

  app.get("/api/v1/openapi.json", (req, res) => {
    res.send(openApiDocument);
  });

  app.get("/api/v1/docs", (req, res) => {
    res.send(
      createDocs(
        `${getConfig("server.baseUrl")}:${getConfig("server.port")}/api/v1/openapi.json`,
        `${getConfig("server.baseUrl")}:${port}/public/redoc.js`
      )
    );
  });

  app.use("/public", express.static("public"));

  app.use("/api/v1/types", express.static("trpc-export/types"));
}

app.use(
  "/api/v1/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use("/api/v1", bodyParser.json(), createOpenApiExpressMiddleware({ router: appRouter, createContext }));

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
