import moment from "moment";

const now = moment();

export const auth = {
  loginIsLoading: false,
  user: null
}

export const projects = {  
  collection: [],
  projectsLoading: false
}

export const records = {
  collection: [],
  newRecord: {
    project: "CUBICIDE",
    subproject: "Logistik",
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
