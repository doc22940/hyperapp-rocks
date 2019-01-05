import {h} from 'hyperapp'

import {Modal} from '../../theme/Modal'
import {Spinner} from '../../theme/Spinner'
import {Github, ArrowLeftCircle, ArrowRightCircle, PlusCircle} from '../icons'

import {Navigate} from '../../actions'

// import './style.css'


// Main exported component:
// Loads projects specified in the URL
// and displays them in a popup modal
export const ProjectViewer = ({state}) => {

  const project = state.projectCache && state.projectCache[id] ? state.projectCache[id] : null

  // if (!project) {
  //   // If the project doesn't exist in the state,
  //   // trigger a fetch to load it
  //   actions.FetchProject(id)
  // }


  return (
    <Modal close={[Navigate, '/']}>
      <div class="project-viewer">
        {
          project
            ? project._id
              ? <Project {...project} />
              : <FourOhFour />
            : <Spinner large />
        }
      </div>
    </Modal>
  )
}




// Project large display
const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project-content" key={_id}>
    <a href={link} target="_blank" class="img">
      {thumbnail ? <img src={`https://hyperapp.rocks${thumbnail.url}`} alt={title}/> : null}
    </a>
    <div class="info">
      <h2>{title}</h2>
      <p>Website: <a href={link} target="_blank">{link}</a></p>
      {author ? <p>Author: <b>{author}</b></p> : null}
      {github ? <p><a href={github} target="_blank"><Github />Github</a></p> : null}
      <NavBtns currId={_id} />
    </div>
    <div class="description">
      {description}
    </div>
  </div>
)


// 404 message when project not found
const FourOhFour = () => (
  <div class="four-of-four">
    <h2>404.</h2>
  </div>
)


// Previous and Next buttons.
const NavBtns = ({currId, state}) => (
  state,
  actions,
  currIndex = state.projects.indexOf(currId)
) => (
  <div class="nav-btns">
    {
      currIndex > 0 
        ? <a to={'/' + state.projects[currIndex - 1]} title="Previous" class="left"><ArrowLeftCircle /></a>
        : null
    }
    {
      currIndex < state.projects.length
        ? 
          state.projects[currIndex + 1]
            ? <a to={'/' + state.projects[currIndex + 1]} title="Next" class="right"><ArrowRightCircle /></a>
            : <span onclick={actions.LoadProjects} title="Load more" class="right">{state.isFetching ? <Spinner /> : <PlusCircle />}</span>
        : null
    }
  </div>
)
