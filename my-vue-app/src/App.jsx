import Navbar from './navbar'
import { Outlet } from 'react-router-dom' 
import { createBrowserRouter } from 'react-router-dom' 
import Body from './Body'

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path:"/login",
        element:<h1>Login Page</h1>
      }
    ],
  },
])

export default AppRouter