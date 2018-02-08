import moment from "moment";

const now = moment();

export const data = {
  records: [],
  nextStartTime: "08:00:00",
  projects: [],
  projectsLoading: false,
  workItem: {
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
  hMenuActiveItem: "",
  loginIsLoading: false,
  user: null,
  sidebarIsVisible: false,          
  vMenuActiveItem: ""
};
