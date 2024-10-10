
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import TemporaryDrawer from './pages/root';

import { CreateMeeting } from './pages/create_meeting';
import { Meetings } from './pages/meetings';



export const routes =[

  { lable:"Meetings",
    path: "Meetings",
    element: <Meetings/>
  },

  {
    lable:"create",
    path: "Create",
    element: <CreateMeeting />
  },
]




const router = createBrowserRouter([
  {
    path: "/",
    element: <TemporaryDrawer/>,
    children: routes,
  },
]);





function App() {
  
  return (
    <>
            <RouterProvider router={router} />
    </>
)

}

export default App
