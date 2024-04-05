let colors = ["синий", "черный", "зеленый", "красный", "желтый", "зеленый"];

const createColorString = array => {
    return colors.filter( item => (item === 'черный' || item === 'красный' || item === 'желтый')).join('-');
}

console.log(createColorString(colors));
