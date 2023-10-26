import config, { TConfig } from "~/config";

type TIsRecord<T> = T extends Record<string, unknown> ? T : never;

type TPathOf<TObj extends Record<string, unknown>, TPath extends string> = TPath extends `${infer TStart}.${infer TRest}`
  ? TStart extends keyof TObj
    ? TRest extends string
      ? TPathOf<TIsRecord<TObj[TStart]>, TRest>
      : never
    : never
  : TPath extends keyof TObj
  ? TObj[TPath]
  : never;

function isRecord(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null;
}

export function getConfig<TPath extends string>(path: TPath): TPathOf<TConfig, TPath> {
  const paths = path.split(".");
  let currentValue: unknown = config;

  for (const p of paths) {
    if (isRecord(currentValue) && p in currentValue) {
      currentValue = currentValue[p];
    } else {
      throw new Error(`Path "${path}" does not exist in config.`);
    }
  }

  return currentValue as TPathOf<TConfig, TPath>;
}
