import { sum } from "../../utils/functions";


test('function sum should return sum of two numbers and to only run once', () => {
    const sumSim = jest.fn(sum);

    const result = sumSim(1, 3);

    expect(sumSim.mock.calls.length).toBe(1)
    expect(result).toEqual(4);

})
