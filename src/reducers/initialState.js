import moment from "moment";

const now = moment();

export const data = {
  items: [],
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
  },
  daysOfEffort: []
};

export const ui = {
  hMenuActiveItem: "index",
  loginIsLoading: false,
  vMenuActiveItem: "",
  user: null,
  sidebarIsVisible: false
};
