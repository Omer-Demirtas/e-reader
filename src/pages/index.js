import Header from "components/Header";
import { Outlet } from "react-router-dom";


const AppLayout = () => 
{

    return (
        <>
            <Outlet />
        </>
    );
}

export default AppLayout;