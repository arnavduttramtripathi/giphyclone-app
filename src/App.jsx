import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import AppLayout from "./layouts/app-layout";
import HomePage from "./pages/home";
import Search from "./pages/search";
import GifPage from "./pages/single-gif";
import Categories from "./pages/categories"; 
import Favorites from "./pages/favorites";  
import GifProvider from "./context/context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:category',
        element: <Categories />,
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/:type/:slug',
        element: <GifPage />,
      },
      {
        path: '/favorite', // corrected path name
        element: <Favorites />,
      },
    ]
  }
]);

function App() {
  return <GifProvider><RouterProvider router={router} /></GifProvider>
  // <div className="bg-red-500"> krte h bhai! let's go</div>
};

export default App;
