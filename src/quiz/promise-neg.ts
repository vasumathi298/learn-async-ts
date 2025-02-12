function logRowsWithNegativeNumbers(arr: number[][]): Promise<void> {
    if (arr.length === 0) {
        return Promise.reject('The array is empty.');
    }

    const rowChecks: Promise<void>[] = arr.map((row: number[], index: number): Promise<void> => {
        return new Promise<void>((resolve) => {
            setImmediate(() => {
                const hasNegative: boolean = row.some((num: number) => num < 0);
                if (hasNegative) {
                    console.log(`Row ${index} has a negative number:`, row);
                }
                resolve();
            });
        });
    });

    return Promise.all(rowChecks)
        .then(() => {
            console.log('Completed checking all rows.');
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
}

const array2D_3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

logRowsWithNegativeNumbers(array2D_3)
    .then(() => {
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });