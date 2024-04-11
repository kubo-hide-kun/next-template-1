import { describe, test, expect } from '@jest/globals';
import { Context } from '~/server/application/context';
import { build } from '~/server/application/usecases/build';

const context = {
  resources: {},
} as unknown as Context;

describe('usecase.build', () => {
  test('buildの定義順がアルファベットになっているか？', async () => {
    const isAlphabeticalOrder = (items: string[]) => {
      const sortedItems = [...items].sort();
      return items.join() === sortedItems.join();
    };

    const result = build(context);
    const keys = Object.keys(result);

    expect(isAlphabeticalOrder(keys)).toBe(true);
  });
});
