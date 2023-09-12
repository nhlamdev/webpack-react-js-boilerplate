import '@/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToolboxComponent } from '@/toolbox'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div id='content' className='flex-1'></div>
    <ToolboxComponent />
  </React.StrictMode>
)
