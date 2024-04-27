import Transition from "../../../components/layout/Transition";
import HorizontalWaves from "../../../components/layout/waves/horizontal/HorizontalWaves";
import CreationForm from "./CreationForm";

const SightCreation = () => {
    return (
        <main className="w-screen flex justify-center flex-col relative">
            <HorizontalWaves />
            <div className="PageContent self-center justify-center w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)] flex flex-col gap-5 mt-24 mb-10">
                <CreationForm />
            </div>
        </main>
    );
};

export default Transition(SightCreation);
