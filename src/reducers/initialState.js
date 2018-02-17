import moment from "moment";

const now = moment();

export const auth = {
  loginIsLoading: false,
  user: null
}

export const categorization = {  
  activities: [],
  activitiesLoading: false,
  projects: [],
  projectsLoading: false,
  subProjects: [],
  subProjectsLoading: false,
  tasks: [],
  tasksLoading: false
}

export const records = {
  collection: [],
  newRecord: {
    project: "XANIDE",
    subProject: "Hull",
    task: "Frontend",
    activity: "Small",
    description: "React-Entwicklung",
    date: now.format("DD.MM.YYYY"),
    timeStart: now.format("HH:mm"),
    timeEnd: now.format("HH:mm")
  }
}

export const travel = {
  travelDates: [
    "01.02.2018",
    "02.02.2018",
    "06.02.2018"
  ]
}

export const ui = {
  menuActiveItem: "",
  sidebarActiveItem: "",
  sidebarIsVisible: false
};
