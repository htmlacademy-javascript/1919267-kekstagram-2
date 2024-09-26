//Функция для проверки длины строки

function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);
// console.log(checkStringLength('проверяемая строка', 20)); // true
// console.log(checkStringLength('проверяемая строка', 18)); // true
// console.log(checkStringLength('проверяемая строка', 10)); // false


//Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  const modifiedValue = string.replaceAll(' ', '').toLowerCase();
  return modifiedValue === modifiedValue.split('').reverse().join('');
}

isPalindrome('топот');
// console.log(isPalindrome('топот')); // true
// console.log(isPalindrome('ДовОд')); // true
// console.log(isPalindrome('Кекс')); // false
// console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN

function getNumbers (value) {
  let result = '';
  if (typeof value === 'string') {
    const modifiedValue = value.replaceAll(' ', '');
    for (let i = 0; i < modifiedValue.length; i++) {
      if (!isNaN(Number(modifiedValue[i]))) {
        result += Number(modifiedValue[i]);
      }
    }
  } else {
    const modifiedValue = value.toString();
    for (let i = 0; i < modifiedValue.length; i++) {
      if (!isNaN(Number(modifiedValue[i]))) {
        result += Number(modifiedValue[i]);
      }
    }
  }

  return result.length > 0 ? parseInt(result, 10) : 'NaN';
}

getNumbers('ECMAScript 2022');
// console.log(getNumbers('ECMAScript 2022')); // 2022
// console.log(getNumbers('1 кефир, 0.5 батона')); // 105
// console.log(getNumbers('агент 007')); // 7
// console.log(getNumbers('а я томат')); // NaN
// console.log(getNumbers(2023)); // 2023
// console.log(getNumbers(-1)); // 1
// console.log(getNumbers(1.5)); // 15
