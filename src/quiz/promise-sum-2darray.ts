// Promise.all
function sum2DArrayConcurrently(arr: number[][]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        if (arr.length === 0) {
            reject('Cannot sum an empty array');
            return;
        }

        const rowSumPromises: Promise<number>[] = arr.map((row: number[], index: number): Promise<number> => {
            return new Promise<number>((resolveRow) => {
                setTimeout(() => {
                    let rowSum = row.reduce((acc: number, num: number) => acc + num, 0);
                    console.log(`Row ${index} sum: ${rowSum}`);
                    resolveRow(rowSum);
                }, 0);
            });
        });

        Promise.all(rowSumPromises)
            .then((rowSums: number[]) => {
                const totalSum = rowSums.reduce((acc: number, curr: number) => acc + curr, 0);
                resolve(totalSum);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// Async-Await
async function sum2DArrayWithAsyncAwait(arr: number[][]): Promise<number> {
    if (arr.length === 0) {
        throw new Error('Cannot sum an empty array');
    }

    try {
        const rowSumPromises = arr.map(async (row: number[], index: number): Promise<number> => {
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
            const rowSum = row.reduce((acc: number, num: number) => acc + num, 0);
            console.log(`Row ${index} sum: ${rowSum}`);
            return rowSum;
        });

        const rowSums = await Promise.all(rowSumPromises);
        const totalSum = rowSums.reduce((acc: number, curr: number) => acc + curr, 0);
        return totalSum;
    } catch (error) {
        throw error;
    }
}


const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

sum2DArrayConcurrently(array2D_1)
    .then(result => console.log('Total sum using Promise.all:', result))
    .catch(error => console.error('Error:', error));

(async () => {
    try {
        const result = await sum2DArrayWithAsyncAwait(array2D_1);
        console.log('Total sum using async-await:', result);
    } catch (error) {
        console.error('Error:', error);
    }
})();