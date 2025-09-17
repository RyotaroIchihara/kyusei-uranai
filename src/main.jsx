import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyHello from './MyHello.jsx'
import DateTimeButton from './DateTimeButton.jsx'
import KyuuseiCalculator from './kyuusei.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KyuuseiCalculator />
    {/* <MyHello myName="イッチイ" /> */}
    {/* <App /> */}
   <DateTimeButton type="date" />
    {/* <DateTimeButton type="time" /> */}
  </StrictMode>,
)
