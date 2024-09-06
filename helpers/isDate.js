const moment = require("moment");

const isDate = (value) => {
    if (!value) return false;

    const date = moment(value);

    return date.isValid() ? true : false;
};

const checkEndDate = (startDate, endDate) => {
    const mStart = moment(startDate);
    const mEnd = moment(endDate);

    if (mStart.isSame(mEnd)) return false;

    return mStart.isBefore(mEnd) ? true : false;
};

module.exports = { isDate, checkEndDate };
