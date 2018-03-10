import { createSelector } from "reselect";
import moment from "moment";

const getProjects = state => state.categorization.projects;
const getRecords = state => state.records;
const getSubprojects = state => state.categorization.subprojects;
const getSearchTerm = state => state.ui.searchTerm;
const getSearchScope = state => state.ui.searchScope;
const getTasks = state => state.categorization.tasks;

export const getSelectedProject = state =>
  state.form.newRecordForm ? state.form.newRecordForm.values.project : {};
export const getSelectedSubproject = state =>
  state.form.newRecordForm ? state.form.newRecordForm.values.subproject : {};

export const getSubprojectsByProject = createSelector(
  [getProjects, getSelectedProject, getSubprojects],
  (projects, selectedProject, subprojects) => {
    const project = projects.byId[selectedProject];
    // only show children of selected project
    return project &&
      project.subprojects &&
      subprojects &&
      subprojects.allIds.length > 0
      ? project.subprojects
      : [];
  }
);

export const getTasksBySubproject = createSelector(
  [getSubprojects, getSelectedSubproject, getTasks],
  (subprojects, selectedSubproject, tasks) => {
    const subproject = subprojects.byId[selectedSubproject];
    return subproject && subproject.tasks && tasks && tasks.allIds.length > 0
      ? subproject.tasks
      : [];
  }
);

export const getFilteredRecords = createSelector(
  [getRecords, getSearchScope, getSearchTerm],
  (records, searchScope, searchTerm) => {
    return records.allIds.filter(recordId => {
      return records.byId[recordId][searchScope]
        ? records.byId[recordId][searchScope]
            .toUpperCase()
            .includes(searchTerm.toUpperCase())
        : false;
    });
  }
);

export const getEffortAggregatedByDate = createSelector(
  [getRecords],
  records => {
    return getDaysOfEffort(Array.from(records.byId));
  }
);

export const getEffortAggregatedByMonth = createSelector(
  [getRecords],
  records => {
    return getMonthlyAmountOfEffort(Array.from(records.byId), moment().startOf("month"));
  }
);

const getDaysOfEffort = records => {
  const daysOfEffort = [];
  // change to a date in the month of interest
  const monthDate = moment().startOf("month");
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

const isSameDate = (date1, date2, granularity) => {
  const moment1 = moment(date1, "DD.MM.YYYY");
  const moment2 = moment(date2, "DD.MM.YYYY");
  const isSameDate = moment1.isSame(moment2, granularity);
  return isSameDate;
};
