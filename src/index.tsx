import '@/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToolboxComponent } from '@/toolbox'
import { MainContentComponent } from '@/content'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from 'notistack'

const RootComponent = () => {
  const emotionCache = createCache({ key: 'css' })
  return (
    <React.StrictMode>
      <CacheProvider value={emotionCache}>
        <SnackbarProvider>
          <MainContentComponent />
          <ToolboxComponent />
        </SnackbarProvider>
      </CacheProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RootComponent />)
