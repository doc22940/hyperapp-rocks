
// Http service
export const Http = {

  // Fetch action
  fetch: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url)
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    action: props.action,
    error: props.error
  }),

  post: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.data)
      })
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    data: props.data,
    action: props.action,
    error: props.error
  })

}

// File effects
export const File = {
  read: (props) => ({
    effect: (props, dispatch) => {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        dispatch(props.action, reader.result)
      }, false)
      reader.readAsDataURL(props.file)
    },
    file: props.file,
    action: props.action
  })
}

const historyFx = (dispatch, props) => {
  history.pushState(null, '', props.to)
  dispatchEvent(new CustomEvent('pushstate'))
}

// Location effects / subs baggy
export const Location = {

  go: (props) => [
    historyFx,
    props
  ]
}

// Audio effect utility
export const Sound = {
  play: (props) => ({
    effect: (props, dispatch) => {
      const sound = new Audio(props.trackUrl)
      sound.volume = props.volume
      sound.play()
    },
    trackUrl: props.trackUrl,
    volume: props.volume
  })
}

export const stopPropagation = (state, ev) => {
  ev.stopPropagation()
  return state
}
export const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

export const couchUrl = '/images'
