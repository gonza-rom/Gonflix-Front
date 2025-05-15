
import { AuthProvider } from './contexts/AuthContext'
import { ProfileProvider } from './contexts/ProfileContext'
import Header from './components/Header'

import AppRouter from './routers/AppRouter'
import { ToastContainer } from 'react-toastify'
import { MovieProvider } from './contexts/MovieContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { FooterN } from './components/Footer'


function App() {

  return (
    <>
      <ToastContainer position='top-center' />
      <ProfileProvider>
        <AuthProvider>
          <MovieProvider>
          <ThemeProvider>
            <Header />
            <AppRouter />
            <FooterN />
            </ThemeProvider>
          </MovieProvider>
        </AuthProvider>
      </ ProfileProvider>
    </>
  )
}

export default App
