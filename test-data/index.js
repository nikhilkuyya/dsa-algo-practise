import twoLakhsJSONArrayData from './two-lakhs-array-output.json' with { type: "json" };
const twoLakhsArray = JSON.parse(JSON.stringify(twoLakhsJSONArrayData));
export { twoLakhsArray };