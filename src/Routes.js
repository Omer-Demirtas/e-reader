import PrivateRoute from "components/PrivateRoute";
import AppLayout from "pages";
import NotFound from "pages/404";
import Book from "pages/book";
import Home from "pages/Home/Home";
import Library from "pages/library";


export const Routes = 
[
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/library",
                element: <Library />
            },
            {
                path: "/book/:bookId",
                element: <Book />
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const routesMapper = (routes) => 
{
    return routes.map(route => {
        if(route.auth)
        {
            route.element = (
                <PrivateRoute roles={route.roles || undefined}>{route.element}</PrivateRoute>
            )
        }
        if(route.children)
        {
            route.children = routesMapper(route.children);
        }
        return route;
    });
}

routesMapper(Routes);