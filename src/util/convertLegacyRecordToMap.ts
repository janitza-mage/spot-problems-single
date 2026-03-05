export function convertLegacyRecordToMap<K extends string, V>(record: Record<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  for (const key of Object.keys(record)) {
    result.set(key as K, record[key as K]);
  }
  return result;
}
