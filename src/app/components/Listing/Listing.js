import {h} from 'hyperapp'

import './listing.css'

import {Project} from '../Project/Project.js'
import {Spinner} from '../common/Spinner/Spinner.js'
import {PillButton} from '../common/PillButton/PillButton.js'


export const Listing = ({projects}) => (state, actions) => (
  <main class="listing" key="listing">
    {
      projects
        ? <Results projects={projects} />
        : <Spinner large />
    }
  </main>
)



const Results = ({projects}) => (state, actions) => (
  <div class="results" key="results">
    {
      state.currentSearch
        ? <h2>Search results for: <u>{state.currentSearch}</u></h2>
        : null
    }
    <div class="grid" key="grid">
      {
        projects.length !== 0
          ? projects.map(_id => <Project {...state.projectCache[_id]} />)
          : <div class="empty"><h2>0 results</h2></div>
      }
    </div>
    {
      !state.currentSearch
        ? <PillButton onclick={actions.loadProjects}>Load more{state.isFetching ? <Spinner /> : null}</PillButton>
        : null
    }
  </div>
)
