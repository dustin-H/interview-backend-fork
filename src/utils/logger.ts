import { AsyncLocalStorage } from "async_hooks";
import { ILogObj, IMeta, Logger } from "tslog";

export const asyncLocalStorage: AsyncLocalStorage<{ requestId: string }> = new AsyncLocalStorage();
const defaultLogObject: ILogObj = {
  requestId: () => asyncLocalStorage.getStore()?.requestId,
};

export const logger = new Logger(
  {
    name: "Root",
    hideLogPositionForProduction: process?.env?.NODE_ENV?.toLowerCase() === "production",
    stylePrettyLogs: process?.env?.NODE_ENV?.toLowerCase() !== "production",
    prettyLogTemplate:
      "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t{{filePathWithLine}}{{nameWithDelimiterPrefix}}\t{{requestId}} ",
    overwrite: {
      addPlaceholders: (logObjMeta: IMeta, placeholderValues: Record<string, unknown>) => {
        placeholderValues["requestId"] =
          asyncLocalStorage.getStore()?.requestId != null ? `[${asyncLocalStorage.getStore()?.requestId}]\t` : "";
      },
    },
  },
  defaultLogObject
);

export function getSubLogger(subLoggerName: string): Logger<ILogObj> {
  return logger.getSubLogger({ name: subLoggerName });
}
