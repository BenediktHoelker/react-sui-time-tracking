import { createSelector } from "reselect";
import moment from "moment";

const getProjects = state => state.categorization.projects;
const getRecords = state => state.records.collection;
const getSelectedProject = state => state.records.newRecord.project;
const getSelectedSubProjectName = state => state.records.newRecord.subProject;
const getSubProjects = state => state.categorization.subProjects;
const getTasks = state => state.categorization.tasks;

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

export const getSubProjectsByProject = createSelector(
  [getProjects, getSelectedProject, getSubProjects],
  (projects, selectedProject, subProjects) => {
    // only show children of selected project
    return subProjects
      .filter((subProject, index) => {
        return projects
          .find(project => {
            return project.name === selectedProject;
          })
          .subProjects.includes(index);
      })
      .map(subProject => ({
        key: subProject.name,
        value: subProject.name,
        text: subProject.name
      }));
  }
);

const getSelectedSubProject = createSelector(
  [getSelectedSubProjectName, getSubProjects],
  (selectedSubProjectName, subProjects) => {
    return subProjects.find(subProject => {
      return subProject.name === selectedSubProjectName;
    });
  }
);

const getSubProjectTasks = createSelector(
  [getSelectedSubProject, getTasks],
  (subProject = {}, tasks) => {
    return subProject.tasks
      ? subProject.tasks.map((task, index) => {
          return tasks[index];
        })
      : tasks;
  }
);

export const getTasksBySubProject = createSelector(
  [getSubProjectTasks, getTasks],
  (subProjectTasks, tasks) => {
    // only show children of selected subproject
    return (subProjectTasks ? subProjectTasks : tasks).map(task => ({
      key: task.name,
      value: task.name,
      text: task.name
    }));
  }
);
