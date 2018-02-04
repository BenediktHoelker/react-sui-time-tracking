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
    dailyEffort = calculateEffort(workItems, date, 'day')
    daysOfEffort.push({ id: i, date: date, effort: dailyEffort})

    monthDate.add(1, 'day')
  }

  return daysOfEffort
}

function calculateEffort(workItems, date, granularity) {
  let duration
  let filteredItems = workItems.filter(workItem => {
    return isSameDate(workItem.date, date, granularity)
  })

  let sum  =  filteredItems.reduce((accumulator, current) => {
    duration = moment.duration(current.timeSpent)
    return accumulator.add(duration)
  }, moment.duration("00:00:00"))

  // Show accumulated hours + mm:ss 
  let sumFormatted = Math.floor(sum.asHours()) + moment.utc(sum.asMilliseconds()).format(":mm:ss")
  return sumFormatted
}

function isSameDate(date1, date2, granularity){
  const moment1 = moment(date1, 'DD.MM.YYYY')
  const moment2 = moment(date2, 'DD.MM.YYYY')
  const isSameDate = moment1.isSame(moment2, granularity)
  return isSameDate
}

function getMonthlyAmountOfEffort(workItems, dateInMonth){
  const actualMonthlyAmountOfEffort = calculateEffort(workItems, dateInMonth, 'month')
  return actualMonthlyAmountOfEffort
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
        monthlyAmountOfEffort: getMonthlyAmountOfEffort(items, moment().startOf('month')),
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
