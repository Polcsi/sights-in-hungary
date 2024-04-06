import FooterBottom from "../../components/layout/footer/FooterBottom";
import FooterLogo from "../../components/layout/footer/FooterLogo";
import Transition from "../../components/layout/Transition";
import MapLayout from "../../components/map/MapLayout";
import Card1 from "./Card1";
import Card2 from "./Card2";
import ContactSection from "./ContactSection";
import Featured from "./Featured";

const Home = () => {
    return (
        <main>
            <MapLayout />
            <Card1 />
            <Card2 />
            <Featured />
            <ContactSection />
            <FooterLogo />
            <FooterBottom />
        </main>
    );
};

export default Transition(Home);
