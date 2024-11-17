import './App.css'
import { AppBar } from '@mui/material';
import Countries from './features/countries/Countries';

function App() {

  return (
    <>
      <AppBar className='center-align'>COUNTRIES</AppBar>
      <Countries/>
    </>
  )
}

export default App
