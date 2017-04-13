const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

const parseDateAndTime = (oldDate) => {
  var newDate = {
    year: oldDate.slice(0, 4),
    month: oldDate.slice(5, 7),
    day: oldDate.slice(8, 10),
    hour: oldDate.slice(11, 13),
    minute: oldDate.slice(14, 16),
    second: oldDate.slice(17, 19),
    millisecond: oldDate.slice(20, 23)
  };
  newDate.month--;
  newDate.hour -= 7;
  if (newDate.hour < 0) {
    newDate.hour += 24;
    newDate.day -= 1;
  }
  return new Date(
    newDate.year,
    newDate.month,
    newDate.day,
    newDate.hour,
    newDate.minute,
    newDate.second,
    newDate.millisecond
  );
}

const nameSort = (a, b, order) => {
  if (order === 'desc') {
    if (a.last_name !== b.last_name) {
      return b.last_name.localeCompare(a.last_name);
    } else {
      return b.first_name.localeCompare(a.first_name);
    }
  } else {
    if (a.last_name !== b.last_name) {
      return a.last_name.localeCompare(b.last_name);
    } else {
      return a.first_name.localeCompare(b.first_name);
    }
  }
}

const dateFormatter = (cell) => {
  return `${days[cell.getDay()]}, ${months[cell.getMonth()]} ${cell.getDate()}, ${cell.getFullYear()}`;
}

const timeFormatter = (cell) => {
  var suffix;
  var hours = cell.getHours();
  var minutes = cell.getMinutes();
  if (hours >= 12) {
    suffix = 'PM';
    hours -= 12;
  } else {
    suffix = 'AM';
  }
  if (hours === 0) {
    hours = 12;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}:${cell.getSeconds()} ${suffix}`;
}

module.exports = {
  months: months,
  days: days,
  nameSort: nameSort,
  parseDateAndTime: parseDateAndTime,
  dateFormatter: dateFormatter,
  timeFormatter: timeFormatter
}