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
    daysOfEffort.push({ id: i, date: date, effort: dailyEffort })
    monthDate.add(1, 'day')
  }

  return daysOfEffort
}

function calculateDailyEffort(workItems, date){
  return workItems.filter(workItem => {
    workItem.date === date
  }).reduce((accumulator, current) => {
    accumulator + current.effort
  }, 0)
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
        items: items,
        nextStartTime: items[items.length - 1]
          ? items[items.length - 1].timeEnd
          : new Date().toLocaleTimeString(),
        workItem: items[0] ? items[0] : {}
        //daysOfEffort: getDaysOfEffort(items)
      }
    default:
      return state
  }
}
