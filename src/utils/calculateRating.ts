import { IRating } from "../pages/sights/SightCard";

const calculateRating = (ratings: IRating[] | null | undefined) => {
    if (!ratings) return 0;

    const ratingSum = ratings?.reduce((acc, curr) => acc + curr.rating, 0);

    if (ratingSum === 0 || ratings?.length === 0) return 0;

    return ratingSum / ratings?.length;
};

export default calculateRating;
