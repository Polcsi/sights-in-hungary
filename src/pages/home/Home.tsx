import FooterBottom from "../../components/layout/footer/FooterBottom";
import FooterLogo from "../../components/layout/footer/FooterLogo";
import Transition from "../../components/layout/Transition";

const Home = () => {
    return (
        <main>
            <FooterLogo />
            <FooterBottom />
        </main>
    );
};

export default Transition(Home);
