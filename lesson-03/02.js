let words = ["яблоко", "банан", "апельсин", "манго", "киви"];

const search = array => array.indexOf('апельсин') < 0 ? 'Придется поискать в другом магазине…' : 'Ура! нашел'

console.log(search(words));