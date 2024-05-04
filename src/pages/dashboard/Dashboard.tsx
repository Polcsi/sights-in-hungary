import Transition from "../../components/layout/Transition";
import LikedSightsList from "./LikedSightsList";
import OwnSights from "./OwnSights";

const Dashboard = () => {
    return (
        <main className="w-full h-full flex justify-center">
            <div className="flex items-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] gap-5 self-center mt-20">
                <LikedSightsList />
                <OwnSights />
            </div>
        </main>
    );
};

export default Transition(Dashboard);
