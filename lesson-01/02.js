let number1 = Math.floor(Math.random() * 100);

const checkEvenOrOdd = () => number1 % 2 === 0
        ? `${number1}:Это четное число`
        : `${number1}:Это нечетное число`;


console.log(checkEvenOrOdd(number1));