
import { createRoot } from 'react-dom/client'

import './styles/App.css'
import './styles/index.css'
import router from './routes/routes'
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
)
