import { data } from "./initialState";
import {
  EDIT_FIELD,
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  SET_ITEMS,
  REMOVE_FROM_STATE,
  SUBMIT_ITEM
} from "../actions/actionTypes";
import moment from "moment";

function getDaysOfEffort(workItems) {
  const daysOfEffort = [];
  const monthDate = moment().startOf("month"); // change to a date in the month of interest
  const todayDaysCount = moment().date();

  let dailyEffort;
  let date;

  for (var i = 0; i < todayDaysCount; i++) {
    date = monthDate.format("DD.MM.YYYY");
    dailyEffort = calculateEffort(workItems, date, "day");
    daysOfEffort.push({ id: i, date: date, effort: dailyEffort });

    monthDate.add(1, "day");
  }

  return daysOfEffort;
}

function calculateEffort(workItems, date, granularity) {
  let duration;
  const filteredItems = workItems.filter(workItem => {
    return isSameDate(workItem.date, date, granularity);
  });

  const sum = filteredItems.reduce((accumulator, current) => {
    duration = moment.duration(current.timeSpent);
    return accumulator.add(duration);
  }, moment.duration("00:00:00"));

  // Show accumulated hours + mm:ss
  const sumFormatted =
    Math.floor(sum.asHours()) +
    moment.utc(sum.asMilliseconds()).format(":mm:ss");
  return sumFormatted;
}

function isSameDate(date1, date2, granularity) {
  const moment1 = moment(date1, "DD.MM.YYYY");
  const moment2 = moment(date2, "DD.MM.YYYY");
  const isSameDate = moment1.isSame(moment2, granularity);
  return isSameDate;
}

function getMonthlyAmountOfEffort(workItems, dateInMonth) {
  const actualMonthlyAmountOfEffort = calculateEffort(
    workItems,
    dateInMonth,
    "month"
  );
  return actualMonthlyAmountOfEffort;
}

export default function dataReducer(state = data, action) {
  switch (action.type) {
    case EDIT_FIELD: {
      return {
        ...state,
        workItem: {
          ...state.workItem,
          ...{
            [action.name]: action.value
          }
        }
      };
    }
    case REQUEST_PROJECTS:
      return {
        ...state,
        projectsLoading: true
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        projectsLoading: false
      };
    case REMOVE_FROM_STATE:
      const index = state.items
        .find(item => action.itemId === item.id)
        .map((item, index) => index);
      return {
        ...state,
        items: state.items.splice(index, 1)
      };
    case SET_ITEMS:
      const items = action.items;
      const now = new Date();
      return {
        ...state,
        daysOfEffort: getDaysOfEffort(items),
        monthlyAmountOfEffort: getMonthlyAmountOfEffort(
          items,
          moment().startOf("month")
        ),
        items: items,
        nextStartTime: items[items.length - 1]
          ? items[items.length - 1].timeEnd
          : new Date().toLocaleTimeString(),
        workItem: items[0]
          ? items[0]
          : {
              project: "",
              subproject: "Logistik",
              scope: "Frontend",
              task: "Programmierung",
              description: "React-Entwicklung",
              date: now.toLocaleDateString(),
              timeStart: now.toLocaleTimeString(),
              timeEnd: now.toLocaleTimeString()
            }
      };
    default:
      return state;
  }
}
