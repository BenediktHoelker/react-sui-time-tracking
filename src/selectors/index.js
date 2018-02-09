import { createSelector } from "reselect";
import moment from "moment";

const getRecords = state => state.data.records;

const getDaysOfEffort = records => {
  const daysOfEffort = [];
  const monthDate = moment().startOf("month"); // change to a date in the month of interest
  const todayDaysCount = moment().date();

  let dailyEffort;
  let date;

  for (var i = 0; i < todayDaysCount; i++) {
    date = monthDate.format("DD.MM.YYYY");
    dailyEffort = calculateEffort(records, date, "day");
    daysOfEffort.push({ id: i, date: date, effort: dailyEffort });

    monthDate.add(1, "day");
  }

  return daysOfEffort;
};

const calculateEffort = (records, date, granularity) => {
  let duration;
  const filteredRecords = records.filter(record => {
    return isSameDate(record.date, date, granularity);
  });

  const sum = filteredRecords.reduce((accumulator, current) => {
    duration = moment.duration(current.timeSpent);
    return accumulator.add(duration);
  }, moment.duration("00:00:00"));

  // Show accumulated hours + mm:ss
  const sumFormatted =
    Math.floor(sum.asHours()) +
    moment.utc(sum.asMilliseconds()).format(":mm:ss");
  return sumFormatted;
};

const getMonthlyAmountOfEffort = (records, dateInMonth) => {
  const actualMonthlyAmountOfEffort = calculateEffort(
    records,
    dateInMonth,
    "month"
  );
  return actualMonthlyAmountOfEffort;
};

const getRecordsOfDate = (records, date) => {
  const filteredRecords = records.filter(record => {
    return isSameDate(record.date, date, "day");
  });
  return filteredRecords;
};

const isSameDate = (date1, date2, granularity) => {
  const moment1 = moment(date1, "DD.MM.YYYY");
  const moment2 = moment(date2, "DD.MM.YYYY");
  const isSameDate = moment1.isSame(moment2, granularity);
  return isSameDate;
};

export const getNewRecordStartTime = createSelector([getRecords], records => {
  const recordsOfDate = getRecordsOfDate(records, moment());
  const recordsOfDateCount = recordsOfDate.length;
  return recordsOfDate && recordsOfDateCount > 0
    ? recordsOfDate[recordsOfDateCount - 1].timeStart
    : moment().format("HH:mm");
});

export const getNewRecord = createSelector(
  [getNewRecordStartTime],
  newRecordStartTime => {
    const now = moment()
    return {
      project: "CUBICIDE",
      subproject: "Logistik",
      scope: "Frontend",
      task: "Programmierung",
      description: "React-Entwicklung",
      date: now.format("DD.MM.YYYY"),
      timeStart: newRecordStartTime,
      timeEnd: now.format("HH:mm")
    };
  }
);

export const getEffortAggregatedByDate = createSelector(
  [getRecords],
  records => {
    return getDaysOfEffort(records);
  }
);

export const getEffortAggregatedByMonth = createSelector(
  [getRecords],
  records => {
    return getMonthlyAmountOfEffort(records, moment().startOf("month"));
  }
);
