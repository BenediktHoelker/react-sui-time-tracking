import moment from "moment";

const now = moment();

export const auth = {
  loginIsLoading: false,
  user: null
}

export const categorization = {  
  projects: [],
  projectsLoading: false,
  subProjects: [],
  subProjectsLoading: false
}

export const records = {
  collection: [],
  newRecord: {
    project: "XANIDE",
    subProject: "Hull",
    scope: "Frontend",
    task: "Programmierung",
    description: "React-Entwicklung",
    date: now.format("DD.MM.YYYY"),
    timeStart: now.format("HH:mm"),
    timeEnd: now.format("HH:mm")
  }
}

export const ui = {
  menuActiveItem: "",
  sidebarActiveItem: "",
  sidebarIsVisible: false
};
