import runInParallel from "./solution";

// use jest to write tests for the function
describe("runInParallel", () => {
    it("should return an empty array if no urls are passed", async () => {
        const result = await runInParallel([], 2);
        expect(result).toEqual([]);
    })

    it("should be able to handle a single URL", async () => {
        const result = await runInParallel([
            'https://jsonplaceholder.typicode.com/users'
        ]);

        // should not 
        expect(result).toHaveLength(1);
    })

    it("should be able to handle a large number of URLs", async () => {
        const result = await runInParallel([
            'https://jsonplaceholder.typicode.com/users',
            'https://jsonplaceholder.typicode.com/posts',
            'https://jsonplaceholder.typicode.com/albums'
        ], 2);

        expect(result).toHaveLength(3);
    })
})