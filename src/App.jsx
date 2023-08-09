import { RouterProvider } from 'react-router-dom';
import routes from './router/routes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  )
}

export default App;