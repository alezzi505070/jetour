export const PRELOAD_BATCH_SIZE = 4;
export const PRELOAD_BATCH_DELAY_MS = 180;
export const PRELOAD_START_DELAY_MS = 1600;

function normalizeIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

export function storeInitialFrame<T>(images: T[], startIndex: number, image: T) {
  images[startIndex] = image;
  return images;
}

export function createFramePreloadQueue(count: number, startIndex: number) {
  if (count <= 1) return [];

  const normalizedStart = normalizeIndex(startIndex, count);
  const queue: number[] = [];
  const seen = new Set([normalizedStart]);

  for (let offset = 1; queue.length < count - 1 && offset < count; offset++) {
    const forward = normalizeIndex(normalizedStart + offset, count);
    if (!seen.has(forward)) {
      seen.add(forward);
      queue.push(forward);
    }

    const backward = normalizeIndex(normalizedStart - offset, count);
    if (queue.length < count - 1 && !seen.has(backward)) {
      seen.add(backward);
      queue.push(backward);
    }
  }

  return queue;
}

export function getNextFrameBatch(queue: readonly number[], batchSize: number) {
  const safeBatchSize = Math.max(1, Math.floor(batchSize));
  return {
    batch: queue.slice(0, safeBatchSize),
    remaining: queue.slice(safeBatchSize),
  };
}
