import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css'
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
     <Router/>
     <ToastContainer/>
    </>
  )
}

export default App
