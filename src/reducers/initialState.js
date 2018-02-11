import moment from "moment";

const now = moment();

export const data = {
  records: [],
  projects: [],
  projectsLoading: false,
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
};

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

export const projects = {  
  collection: [],
  projectsLoading: false
}

export const ui = {
  menuActiveItem: "",
  sidebarActiveItem: "",
  sidebarIsVisible: false
};

export const auth = {
  loginIsLoading: false,
  user: null
}
