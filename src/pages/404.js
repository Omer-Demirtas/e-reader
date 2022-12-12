import { useNavigate } from "react-router-dom";


const NotFound = () => 
{
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/")} >Go to Home</button>
        </div>
    );
}

export default NotFound;