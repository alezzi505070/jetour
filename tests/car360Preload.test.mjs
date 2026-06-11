import assert from "node:assert/strict";
import test from "node:test";
import {
  createFramePreloadQueue,
  getNextFrameBatch,
  storeInitialFrame,
} from "../src/components/models/car360Preload.ts";

test("stores the first loaded frame in the shared image table before drawing", () => {
  const images = [];

  const result = storeInitialFrame(images, 3, "frame-3");

  assert.equal(result, images);
  assert.equal(images[3], "frame-3");
});

test("queues every non-initial frame once, starting near the initial angle", () => {
  const queue = createFramePreloadQueue(8, 3);

  assert.deepEqual(queue, [4, 2, 5, 1, 6, 0, 7]);
  assert.equal(queue.includes(3), false);
  assert.deepEqual([...queue].sort((a, b) => a - b), [0, 1, 2, 4, 5, 6, 7]);
});

test("takes small batches without mutating the original queue", () => {
  const queue = [4, 2, 5, 1, 6];

  assert.deepEqual(getNextFrameBatch(queue, 2), {
    batch: [4, 2],
    remaining: [5, 1, 6],
  });
  assert.deepEqual(queue, [4, 2, 5, 1, 6]);
});
