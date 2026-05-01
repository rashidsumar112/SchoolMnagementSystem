import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

import './index.css';

import FormWithTable from './FormWithTable.jsx';

const savedTheme = localStorage.getItem('theme')
const shouldUseDark = savedTheme ? savedTheme === 'dark' : true
document.documentElement.classList.toggle('dark', shouldUseDark)













createRoot(document.getElementById('root')).render(
  <StrictMode>
<FormWithTable />
  </StrictMode>
)
