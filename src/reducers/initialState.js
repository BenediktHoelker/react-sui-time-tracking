const now = new Date();

export const data = {
  items: [],
  nextStartTime: "08:00:00",
  projects: [],
  projectsLoading: false,
  workItem: {
    project: "",
    subproject: "Logistik",
    scope: "Frontend",
    task: "Programmierung",
    description: "React-Entwicklung",
    date: now.toLocaleDateString(),
    timeStart: now.toLocaleTimeString(),
    timeEnd: now.toLocaleTimeString()
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
