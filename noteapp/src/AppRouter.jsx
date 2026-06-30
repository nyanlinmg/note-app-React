import { createBrowserRouter, RouterProvider} from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NoteDetail from "./pages/NoteDetail";
import Trash from "./pages/Trash";
import Favorite from "./pages/Favorite";
import TagPage from "./pages/TagPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: '/detail/:id',
                element: (
                    <ProtectedRoute>
                        <NoteDetail />
                    </ProtectedRoute>
                )
            },
            {
                path: '/trash',
                element: <Trash />
            },
            {
                path: '/favorite',
                element: <Favorite />
            },
            {
                path: '/tagPage/:id',
                element: <TagPage />
            }
        ]
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}
