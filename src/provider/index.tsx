import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'

interface ProviderComponentProps {
  children: React.ReactNode
}
export const ProviderComponent = (props: ProviderComponentProps) => {
  const emotionCache = createCache({ key: 'css' })
  const { children } = props
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </CacheProvider>
  )
}
