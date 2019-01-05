import {getData, postData, postImage} from './utils'

// Global actions for the app


// Handles searching
export const HandleSearchForm = (state, ev) => {
  ev.preventDefault()
  // actions.scrollToProjects()
  
  // actions.SetLastSearch(state.search)

  // if (state.search) {
  //   getData(`/project?_q=${state.search}&_limit=120&status=published`)
  //     .then(projects => {
  //       actions.SetProjects(projects)
  //     })
  // } else {
  //   actions.SetProjects(null)
  //   actions.LoadProjects();
  // }

}


// Current search input value
export const SetSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})


// Search used for currently displayed projects
export const SetLastSearch = (state, ev) => ({
  ...state,
  lastSearch: ev.target.value
})




// Loads projects
export const LoadProjects = (state, ev) => [
  {
    ...state,
    isFetching: true
  },
  getData(`/project?_sort=createdAt:desc&_start=${state.projects ? state.projects.length : 0}&_limit=12&status=published`)
    .then(projects => {
      actions.setIsFetching(false)
      actions.AddProjects(projects)
    })
]




// Handles project submission
export const HandleProjectForm = (state, ev) => {
  ev.preventDefault()
  // postData('/project', state.projectForm)
  //   .then(project =>
  //     postImage('/upload', {
  //       files: state.projectForm.thumbnail,
  //       refId: project._id,
  //       ref: 'project',
  //       plugin: 'upload',
  //       field: 'thumbnail'
  //     })
  //       .then(files => actions.SetProjectForm({submitted: true}))
  //   )
}



// Sets the project list (replaces)
export const SetProjects = (state, data) => (
  data ? {
    ...state,
    projects: data.map(project => project.id),
    projectCache: data.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
  }
  : state
)


// Adds projects to the list
export const AddProjects = (state, data) => ({
  ...state,
  projects: (state.projects || []).concat(data.map(project => project.id)),
  projectCache: data.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
})



// Nested setter for the project form
export const SetProjectForm = (state, key, ev) => ({
  ...state,
  projectForm: {
    ...state.projectForm,
    [key]: ev.target.value
  }
})


  
// Indexed nested setter
export const SetProject = (state, {id, project}) => ({
  ...state,
  projectCache: {
    ...state.projectCache,
    [id]: project
  }
})



// Fetch project by ID from api then update state
export const FetchProject = (state, id) => {
  getData(`/project/${id}`)
    .then(project => actions.SetProject({id, project}))
}