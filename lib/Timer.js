const moment = require('moment');

class Timer {
  constructor(options) {
    Timer.validateOptions(options);

    this.moment = options.moment || moment;
    this.units = options.units.length ?
      options.units :
      ['seconds', 'minutes', 'hours', 'days', 'months'];
  }

  static validateOptions(options) {
    if (
      options.moment !== undefined &&
      (
        typeof options.moment !== 'function' ||
        !options.moment() instanceof moment
      )
    ) {
      throw new Error("Invalid option - moment");
    }
    if (
      options.units !== undefined &&
      !Array.isArray(options.units)
    ) {
      throw new Error("Invalid option - units");
    }
  }

  static checkDate(date, moment) {
    let type = typeof date;
    let is_valid = false;

    if (type === 'string') {
      date = moment(date);
      is_valid = date.isValid();
    }
    if (type === 'object') {
      is_valid = moment.isDate(date) || moment.isMoment(date);
    }
    
    if (is_valid === false) {
      throw new Error("Invalid date");
    }

    return moment(date);
  }

  colculateDiff(date, compirationDate) {
    date = Timer.checkDate(date, this.moment);
    compirationDate = Timer.checkDate(compirationDate, this.moment);

    if (date.isSame(compirationDate)) {
      return "Just now";
    }

    let units = {};

    this.units.forEach(unit => {
      units[unit] = date.diff(compirationDate, unit);
    });
  
    if (units.seconds && !units.minutes) {
      return `${units.seconds} seconds`;
    }
    if (units.minutes && !units.hours) {
      if (units.seconds % 60 > 30) return `${units.minutes + 1} minutes`;
  
      return `${units.minutes} minutes`;
    }
    if (units.hours && !units.days) {
      if (units.minutes % 60 > 30) return `${units.hours + 1} hours`;
  
      return `${units.hours} hours`;
    }
    if (units.days && units.days < 30) {
      if (units.hours % 24 > 12) return `${units.days + 1} days`;
  
      return `${units.days} days`;
    }
    if (units.days >= 30 && units.days / 30 < 12) {
      return `${Math.round(units.days / 30)} months`;
    }
  
    return "Over year";
  }
}

module.exports = Timer;