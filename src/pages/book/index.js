import { useParams } from "react-router-dom";

const Book = () => 
{
    const { bookId } = useParams();

    console.log({ bookId });

    return (
        <div>Boook</div>
    );
}

export default Book;