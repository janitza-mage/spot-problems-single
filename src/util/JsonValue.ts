export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export interface JsonObject {
  [x: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}
