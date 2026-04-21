import { describe, it, expect } from 'vitest';
import { lilyHomeworkWithAscBubbleSort as lilyHomework1, 
    lilysHomeworkSolution as  lilyHomework2, lilysHomeWork} from './lily-homework';
import tenLakhsInput from './test-data/lily-homework/ten-lakhs-input.json' with { type: 'json'};

const lilyHomework = lilysHomeWork;
describe("lily homework, make the array beautiful", () => {

    it("should return the number of swaps required", () => {
        const arr = [3, 4, 2, 5, 1];
        const minSwaps = lilyHomework(arr);
        expect(minSwaps).toEqual(2);
    })

    it('return the one swap which is out of order', () => {
        const arr = [1, 5, 3, 2];
        const minSwaps = lilyHomework(arr);
        expect(minSwaps).toEqual(1);
    })

    it("return the number of swaps required", () => {
        const arr = [7, 15, 12, 3];        
        const minSwaps = lilyHomework(arr);
        expect(minSwaps).toEqual(2);
    })

    it('should return 99985 for 10k data', () => {
        const output = lilyHomework(tenLakhsInput)
        expect(output).toEqual(99985);
    })

    it("should return minimum swaps if reversed array is sorted", () => {
        const arr = [4, 5, 3, 2, 1];
        const minSwaps = lilyHomework(arr);
        expect(minSwaps).toEqual(1);
    })

    it("should have zero swaps if array is already sorted", () => {
        const arr = [1, 2, 3, 4, 5];
        const minSwaps = lilyHomework(arr);
        expect(minSwaps).toEqual(0);
    })

})