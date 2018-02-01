import * as types from "./actionTypes";

export function requestProjects(projects) {
    return { type: types.REQUEST_PROJECTS };
  }
  
  export function loadProjects() {
    return (dispatch, getState, firebase) => {
      dispatch(requestProjects());
  
      const samplesRef = firebase.database.ref("samples");
  
      samplesRef.on("value", snapshot => {
        let samples = snapshot.val();
        let companies = samples.map(sample => ({
          key: sample.company,
          value: sample.company,
          text: sample.company
        }));
        dispatch(receiveProjects(companies));
      });
    };
  }
  
  export function handleRemoveItem(itemId) {
    return (dispatch, getState, firebase) => {
      const itemsRef = firebase.database.ref(
        "/items/" + getState().user.uid + "/" + itemId
      )
      itemsRef.remove()
      //dispatch(removeFromState(itemId)) // Does not need to be triggered due to firebase realtime
    };
  }
  
  export function removeFromState(itemId){
    return {type: types.REMOVE_FROM_STATE, itemId: itemId}
  }
  
  export function requestWorkItems(user) {
    return (dispatch, getState, firebase) => {
      const itemsRef = firebase.database.ref("items/" + user.uid);
  
      itemsRef.on("value", snapshot => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            project: items[item].project,
            subproject: items[item].subproject,
            scope: items[item].scope,
            task: items[item].task,
            description: items[item].description,
            date: items[item].date,
            timeStart: items[item].timeStart,
            timeEnd: items[item].timeEnd,
            timeSpent: items[item].timeSpent
          });
        }
  
        dispatch(setItems(newState));
      });
    };
  }
  
  export function setItems(items) {
    return { type: types.SET_ITEMS, items: items };
  }
  
  export function receiveProjects(projects) {
    return { type: types.RECEIVE_PROJECTS, projects: projects };
  }