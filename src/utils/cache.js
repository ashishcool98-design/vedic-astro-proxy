import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 86400 });

export function getCache(key) {
  return cache.get(key);
}

export function setCache(key, value) {
  cache.set(key, value);
}
