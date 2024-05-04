import { useParams } from "react-router-dom";
import RatingForm1 from "../../components/map/RatingForm";
const RatingForm = () => {
    const { sightId } = useParams<{ sightId: string }>();

    return (
        <section className="w-full border-t-2 border-t-gray-primary pt-7">
            <RatingForm1 id={sightId} />
        </section>
    );
};

export default RatingForm;
