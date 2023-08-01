
import { RouterProvider } from 'react-router-dom';
import routes from './router/routes';
import { Toaster } from 'react-hot-toast';
import setupThreeJsBackgrourd from './Context/setupThreeJsBackground '
import { useEffect } from 'react';
function App() {
 /*  useEffect(() => {
    // Call the setupThreeJsBackground function and pass the scene as a parameter
    setupThreeJsBackgrourd(routes); // Assuming routes is the scene you want to pass
  }, []); */
  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  )
}

export default App
