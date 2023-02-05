import { Link } from "react-router-dom";

const Home = () => 
{

    return (
        <div>
            Home
            <Link to={"/library"}>
                Library
            </Link>
        </div>
    );
}

export default Home;