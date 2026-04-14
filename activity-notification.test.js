import {describe, it, expect} from 'vitest';
import { countActivityNotifications as countActivityNotificationsOriginal } from './activity-notification';
import { countActivityNotificationsHeaps } from './activity-notification-optimized';
import { twoLakhsArray } from './test-data';

const testFunctions = [{fn: countActivityNotificationsHeaps, name: "optimized"}, {
    fn: countActivityNotificationsOriginal, name: "original"
}];

testFunctions.forEach(({fn: countActivityNotifications, name: prefix},index) => {
    describe(`Count the number of activity notifications - solution with: ${prefix}`, () => {

        it(`${prefix}, should return 0 if there are no activities`, () => {
            const activities = [];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(0);
        });
    
        it(`${prefix}, should return 0 if there is one activity and the window is 3`, () => {
            const activities = [1];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(0);
        });
    
        it(`${prefix}, should return zero if there is exact window size and no notification is needed`, () => {
            const activities = [1,2,3,4,5];
            const result = countActivityNotifications(activities,5);
            expect(result).toBe(0);
        });
    
        it(`${prefix}, should return one if value after trainData is greater than 2* median`, () => {
            const activities = [1,2,3,5];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(1);
        });
    
    
        it(`${prefix}, should return two data after trainData is greater than 2* median`, () => {
            const activities = [1,2,3,6,10];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(2);
        });
    
    
        it(`${prefix}, should return [2 3 4 2 3 6 8 4 5] with trainData as 5 should return 2 notifications`, () => {
            const activities = [2, 3, 4, 2, 3, 6, 8, 4, 5];
            const result = countActivityNotifications(activities,5);
            expect(result).toBe(2);
        });
    
        it(`${prefix}, even data no notification as one transaction which is less than 2* median`, () => {
            const activities = [1,2,3,4,4];
            const result = countActivityNotifications(activities,4);
            expect(result).toBe(0);
        })

        it(`${prefix}, should return 1 if value after trainData is equal than 2* median`, () => {
            const activities = [1,2,3,4,5];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(1);
        });

        it(`${prefix}, should return 2 notifications for unsorted transactions`, () => {
            const activities = [3,1,2,4,5];
            const result = countActivityNotifications(activities,3);
            expect(result).toBe(2);
        });

        it(`${prefix}, should return 633 notifications for 2 lakhs array`, () => {
            const activities = twoLakhsArray.slice();
            const result = countActivityNotifications(activities,10000);
            expect(result).toBe(633);
        });
    });
    
});

// Let review them tomorrow
// https://www.geeksforgeeks.org/dsa/median-of-stream-of-integers-running-integers/
// https://cp-algorithms.com/data_structures/fenwick.html