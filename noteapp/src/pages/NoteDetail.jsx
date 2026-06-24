import { useParams } from "react-router";
import Detail from "../components/Detail";

export default function NoteDetail() {
    const {id} = useParams();

    return (
        <div>
            <Detail id={id} />
        </div>
    )
}