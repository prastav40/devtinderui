import Navbar from '../src/components/navbar'
import { Outlet } from 'react-router-dom' 
import { createBrowserRouter } from 'react-router-dom' 
import Body from '../src/components/Body'
import Login from '../src/components/login'
import Footer from '../src/components/footer'
import {Provider} from 'react-redux'
import appstore from '../utils/appstore'
const App = () => {
  return (
   <Provider store={appstore}>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
   </Provider>
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
        element:<Login />
      }
    ],
  },
])

export default AppRouter