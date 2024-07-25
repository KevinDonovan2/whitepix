import './App.css'
import { ModeToggle } from './components/mode-toggle'
import Login from './pages/Login'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle/>
      <div className='grid grid-cols-1 justify-content-center mt-4'>
        <div className='flex items-center justify-center'>
          <Login/>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
