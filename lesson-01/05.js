let rule = "Еще не родился тот человек, который поставил бы цель и не смог бы стать программистом.";

let resultString;

switch (true) {
    case rule.length < 25:
        resultString = "Все таки нет правил без исключения";
        break;
    case rule.length > 25:
        resultString = "У меня 100 пудов все получится";
        break;
    default:
        resultString = "50 на 50";
};

console.log(resultString);
