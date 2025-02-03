


export const CodingInterview = () => {

    const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const evenNumbers = Numbers.filter(number => number % 2 === 0);
    const max = Math.max(...Numbers);
    const min = Math.min(...Numbers);
    const sum = Numbers.reduce((acc, number) => acc + number, 0);


    console.log('evenNumbers', evenNumbers);
    console.log('max', max);
    console.log('min', min);
    console.log('sum', sum);



    return (
        <div>
            <h1>Coding Interview</h1>
            <p>Here is a collection of code snippets
                from the shop-blackinkpaper project.</p>
        </div>
    )

}