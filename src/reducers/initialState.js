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
  byId: {},
  allIds: [],
}

export const projects = {  
  projects: [],
  projectsLoading: false,
}

export const ui = {
  menuActiveItem: "",
  loginIsLoading: false,
  user: null,
  sidebarIsVisible: false,          
  sidebarActiveItem: ""
};
