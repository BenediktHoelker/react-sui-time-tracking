import moment from "moment";

const now = moment();

export const auth = {
  loginIsLoading: false,
  user: null
};

export const categorization = {
  activities: {
    byId: {},
    allIds: []
  },
  activitiesLoading: false,
  projects: {
    byId: {},
    allIds: []
  },
  projectsLoading: false,
  subprojects: {
    byId: {},
    allIds: []
  },
  subprojectsLoading: false,
  tasks: {
    byId: {},
    allIds: []
  },
  tasksLoading: false
};

export const records = {
  collection: [],
  newRecord: {
    project: "ThyssenKrupp",
    subproject: "Hull",
    task: "Frontend",
    activity: "Small",
    description: "React-Entwicklung",
    date: now.format("DD.MM.YYYY"),
    timeStart: now.format("HH:mm"),
    timeEnd: now.format("HH:mm")
  }
};

export const dailyAdditions = {
  byId: {
    "01.02.2018": { travel: true, leave: true },
    "02.02.2018": { travel: false, leave: true },
    "06.02.2018": { travel: true, leave: false }
  },
  allIds: ["01.02.2018", "02.02.2018", "06.02.2018"]
};

export const ui = {
  menuActiveItem: "",
  sidebarActiveItem: "",
  sidebarIsVisible: false
};
