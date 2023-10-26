import "dotenv/config";
import { PoolConfig } from "pg";
export * from "~/utils/config";

export type TNodeEnv = "production" | "staging" | "development" | "test";

export type TConfig = {
  nodeEnv: TNodeEnv;
  enableDocsClient: boolean;
  server: {
    baseUrl: string;
    port: number;
    allowedOrigins: (string | RegExp)[];
  };
  database: {
    service: PoolConfig;
  };
};

const config: TConfig = {
  nodeEnv: process.env.NODE_ENV as TNodeEnv,
  enableDocsClient: process.env.ENABLE_DOCS_CLIENT === "TRUE",
  server: {
    baseUrl: process.env.BASE_URL ?? "http://localhost",
    port: parseInt(process.env.PORT ?? "3001"),
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") ?? [],
  },
  database: {
    service: {
      connectionString: process.env.DATABASE_URL,
      /* ssl: {
        rejectUnauthorized: process.env.DATABASE_URL_SERVICE_SSL_REJECT_UNAUTHORIZED === "TRUE",
      },*/
    },
  },
};

export default config;
