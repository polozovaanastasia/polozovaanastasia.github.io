const str = "zzzzyzz";

const checkIncludes = (string) => string.includes('y')
    ? "нашел"
    : "заблудился";

console.log(checkIncludes(str))