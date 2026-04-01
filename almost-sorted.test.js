import { describe, it, expect } from 'vitest';
/**
import { almostSorted as almostSortedWithSwap } from './almost-sorted';
describe('almost sorted setup', () => {
    it('should get the first index & lastindex as expected', () => {
        const input = [1, 3, 2];
        const expectedFirstIndex = 1;
        const expectedLastIndex = 2;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input);
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(2);
        expect(isSorted).toEqual(true);
    });

    it('no firstSwable index and no lastSwappableIndex', () => {
        const input = [1, 2, 3];
        const expectedFirstSwappableIndex = -1;
        const expectedLastSwappableIndex = -1;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input);
        expect(firstSwappableIndex).equal(expectedFirstSwappableIndex);
        expect(lastSwappableIndex).equal(expectedLastSwappableIndex);
        expect(swaps.length).toEqual(0);
        expect(isSorted).toEqual(true);
    });

    it('should get the size of swaps to 1 and first and index as expected', () => {
        const input = [1, 4, 3, 2];
        const expectedFirstIndex = 1;
        const expectedLastIndex = 3;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input)
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(2);
        expect(isSorted).toEqual(true);
    })

    it('reversing the array will sort instead of swapping', () => {
        const input = [1, 5, 4, 3, 2];
        const expectedFirstIndex = 1;
        const expectedLastIndex = 4;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input)
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(4);
        expect(isSorted).toEqual(true);
    })

    it('more than one swap test and no reverse of substring can sort', () => {
        const input = [1, 3, 2, 4, 6, 5];
        const expectedFirstIndex = 1;
        const expectedLastIndex = 5;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input)
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(4);
        expect(isSorted).toEqual(false);
    })

    it("negative case for reversing the substring can sort", () => {
        const input = [3, 1, 2];
        const expectedFirstIndex = 0;
        const expectedLastIndex = 2;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input)
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(3);
        expect(isSorted).toEqual(false);
    });

    it("reverse case for reversing the substring can sort", () => {
        const input = [1, 5, 4, 3, 2, 6];
        const expectedFirstIndex = 1;
        const expectedLastIndex = 4;
        const { firstSwappableIndex, lastSwappableIndex, swaps, isSorted } = almostSortedWithSwap(input)
        expect(firstSwappableIndex).toEqual(expectedFirstIndex);
        expect(lastSwappableIndex).toEqual(expectedLastIndex);
        expect(swaps.length).toEqual(4);
        expect(isSorted).toEqual(true);
    });
})
*/