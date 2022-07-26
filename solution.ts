import axios from 'axios';

async function runInParallel (urls: string[], concurrency: number = 1) : Promise<string[]> {
    urls = urls.filter(unit => unit); // remove empty strings | urls just incase

    // handle empty urls
    if (!urls.length) {
        return [];
    }

    // collect the results of the url promises
    const results: string[] = [];

    // used to control how many concurrent requests are running per each cycle
    let window_start = 0;
    let window_end = concurrency; // window_start + concurrency ( removed the window_start since its a 0 on starts anyways )

    while (window_start < urls.length) {
        
        const api_results = await Promise.all(
            urls.slice(window_start, window_end).map(
                async url => {
                    // (await fetch(url)).text() [ was using Node v 16.13.0 and fetch isn't supported currently ]
                    return (await axios.get(url)).data as string;
                }
            )
        );

        // add the results to the results array
        results.push(...api_results);

        // update the window
        window_start = window_end;
        window_end = window_start + concurrency;
    }

    return results;
}

export default runInParallel;