import FooterBottom from "../../components/layout/footer/FooterBottom";
import FooterLogo from "../../components/layout/footer/FooterLogo";
import MapLayout from "../../components/map/MapLayout";
import SightsList from "./SightsList";

const Sights = () => {
    return (
        <main>
            <MapLayout />
            <SightsList />
            <FooterLogo />
            <FooterBottom />
        </main>
    );
};

export default Sights;
