// Напишите функцию, которая принимает время начала и конца рабочего дня,
// а также время старта и продолжительность встречи в минутах и возвращает true,
// если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы:минуты.
// Для указания часов и минут могут использоваться как две цифры, так и одна.
// Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

// Продолжительность задаётся числом.
// Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

function getMinutes (time) {
  const timeArray = time.split(':');
  return parseInt(timeArray[0], 10) * 60 + parseInt(timeArray[1], 10);
}

function checkOvertime (startWorkingTime, endWorkingTime, startMeetingTime, meetingDuration) {
  const startWorkingTimeInMinutes = getMinutes(startWorkingTime);
  const endWorkingTimeInMinutes = getMinutes(endWorkingTime);
  const startMeetingTimeInMinutes = getMinutes(startMeetingTime);
  if (startMeetingTimeInMinutes > endWorkingTimeInMinutes || startMeetingTimeInMinutes < startWorkingTimeInMinutes) {
    return false;
  }

  return startMeetingTimeInMinutes >= startWorkingTimeInMinutes && startMeetingTimeInMinutes + meetingDuration <= endWorkingTimeInMinutes;
}

checkOvertime('08:00', '17:30', '14:00', 90);

// console.log(checkOvertime('08:00', '17:30', '14:00', 90)); // true
// console.log(checkOvertime('8:0', '10:0', '8:0', 120)); // true
// console.log(checkOvertime('08:00', '14:30', '14:00', 90)); // false
// console.log(checkOvertime('14:00', '17:30', '08:0', 90)); // false
// console.log(checkOvertime('8:00', '17:30', '08:00', 900)); // false
