import { data } from "./initialState";
import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  SET_ITEMS,
  REMOVE_FROM_STATE
} from "../actions/actionTypes";
import moment from "moment"

function getDaysOfEffort(workItems) {
  const daysOfEffort = []
  const monthDate = moment().startOf('month') // change to a date in the month of interest
  const daysInMonthCount = monthDate.daysInMonth()
  const todayDaysCount = moment().date()

  let dailyEffort
  let date

  for (var i = 0; i < todayDaysCount; i++) {
    date = monthDate.format('DD.MM.YYYY')
    dailyEffort = calculateDailyEffort(workItems, date)
    daysOfEffort.push({ id: i, date: date, effort: dailyEffort})

    monthDate.add(1, 'day')
  }

  return daysOfEffort
}

function calculateDailyEffort(workItems, date) {
  let duration
  let filteredItems = workItems.filter(workItem => {
    return isSameDate(workItem.date, date)
  })

  let sum  =  filteredItems.reduce((accumulator, current) => {
    duration = moment.duration(current.timeSpent)
    return accumulator.add(duration)
  }, moment.duration("00:00:00"))

  let sumFormatted = moment.utc(sum.asMilliseconds()).format("HH:mm:ss")

  return sumFormatted
}

function isSameDate(date1, date2){
  const moment1 = moment(date1, 'MM.DD.YYYY')
  const moment2 = moment(date2, 'MM.DD.YYYY')
  const isSameDate = moment1.isSame(moment2, 'day')
  return isSameDate
}

function accumulateTimespans(timespans) {
  timespans.map(timespan => {
    return moment.duration(timespan)
  }).reduce((accumulator, current) => {
    return accumulator.add(current)
  }, moment.duration("00:00:00"))
}

export default function uiState(state = data, action) {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return {
        ...state,
        projectsLoading: true
      }
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        projectsLoading: false
      }
    case REMOVE_FROM_STATE:
      const index = state.items
        .find(item => action.itemId === item.id)
        .map((item, index) => index)
      return {
        ...state,
        items: items.splice(index, 1)
      }
    case SET_ITEMS:
      const items = action.items;
      return {
        ...state,
        daysOfEffort: getDaysOfEffort(items),
        items: items,
        nextStartTime: items[items.length - 1]
          ? items[items.length - 1].timeEnd
          : new Date().toLocaleTimeString(),
        workItem: items[0] ? items[0] : {},
      }
    default:
      return state
  }
}
