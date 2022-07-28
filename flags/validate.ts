/** EXTERNALS **/

import { create, defaulted, Struct } from "superstruct";

/** MAIN **/

export type ValidateOptions<T> = {
  type: Struct<T>;
  defaults?: Partial<T>;
};

export function validate<T>(
  data: Record<string, unknown>,
  options: ValidateOptions<T>,
): T {
  const { type, defaults = {} } = options;
  try {
    const schema = defaulted(type, defaults);
    return create(data, schema);
  } catch (error) {
    const { key, value, type } = error;
    if (type === "never") {
      throw new Error(`unknown option '${key}'`);
    } else if (value === undefined) {
      throw new Error(`missing option '${key}'`);
    } else {
      throw new Error(`invalid option '${key}'`);
    }
  }
}
