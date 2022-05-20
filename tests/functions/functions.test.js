import { sum, fetchData } from "../../utils/functions";


test('function sum should return sum of two numbers and to only run once', () => {
    const sumSim = jest.fn(sum);

    const result = sumSim(1, 3);

    expect(sumSim.mock.calls.length).toBe(1)
    expect(result).toEqual(4);

})

test('fetchData should return data from api when given valid url', async () => {
    const fetchDataSim = jest.fn(fetchData);

    const res = await fetchDataSim('https://jsonplaceholder.typicode.com/users')

    expect(fetchDataSim).toBeCalledTimes(1);

    expect(typeof (res) === 'object').toBeTruthy();
    expect(res !== undefined).toBeTruthy();
    expect(Object.keys(res).length > 0).toBeTruthy();

});

test('fetchData should returns errMessage when tried to run without a url', async () => {
    const fetchDataSim = jest.fn(fetchData);

    const res = await fetchDataSim();

    expect(res).toBe('Url was not provided')
});

test('fetchData throws error when given an invalid url', async () => {
    const fetchDataSim = jest.fn(fetchData);

    await expect(fetchDataSim('https://jsonplsfsasraceholder.typicode.com/users')).rejects.toThrow(Error);


})