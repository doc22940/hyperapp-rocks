import {h} from 'hyperapp'
import cc from 'classcat'

import './style.css'

export const NiceInput = ({label = label || 'Label', name = name || 'name', type = type || 'text', placeholder = placeholder || ' ', value, required, hint, setter, ...rest}) => (
  <div class={cc(['nice-input', name])} key={name}>
    {
      type === 'textarea'
      ? <textarea name={name} id={name} placeholder={placeholder} oninput={ev => setter({[name]: ev.target.value})} required={required} {...rest}>{value}</textarea>
      : <input type={type} name={name} id={name} placeholder={placeholder} value={value} oninput={ev => setter({[name]: ev.target.value})} required={required} {...rest} />
    }
    <label for={name}>{label}</label>
    <div class="border"></div>
    {hint && <p class="hint">{hint}</p>}
  </div>
)
