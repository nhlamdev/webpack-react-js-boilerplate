import '@/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ViewResultComponent } from '@/view'
import { ToolBoxListComponent } from '@/toolbox'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ViewResultComponent />
    <ToolBoxListComponent />
  </React.StrictMode>
)
