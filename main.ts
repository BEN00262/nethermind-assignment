import runInParallel from "./solution";

// example usage
;(async () => {
    const results = await runInParallel([
        'https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/albums'
    ], 2);

    console.log(results);
})()