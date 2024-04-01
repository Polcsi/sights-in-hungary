import HorizontalWaves from "../../components/layout/waves/horizontal/HorizontalWaves";
import ContactForm from "./ContactForm";
import Info from "./Info";

// Icons
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

const Contact = () => {
    return (
        <main className="flex flex-col pb-20">
            <HorizontalWaves />
            <header className="text-white text-center flex flex-col gap-2 h-[45vh] justify-center">
                <h1 className="text-[45px] font-bold">Van valami kérdésed?</h1>
                <p className="w-[90%] max-w-[650px] self-center">
                    Vedd fel velünk a kapcsolatot. Kérlek töltsd ki az alábbi űrlapot és mi kapcsolatba lépünk veled.
                </p>
            </header>
            <div className="flex gap-x-24 self-center justify-center">
                <section className="flex flex-col gap-5">
                    <h2 className="text-3xl text-gray-primary font-semibold">Kapcsolat</h2>
                    <hr className="border-gray-primary border-[1px]" />
                    <div className="grid gap-5">
                        <Info icon={<FaPhone />}>+36 30 123 4567</Info>
                        <Info icon={<IoIosMail />}>email@email.email</Info>
                        <Info icon={<MdLocationOn />}>Budapest, 1089, Üllői út 38.</Info>
                    </div>
                </section>
                <section>
                    <ContactForm />
                </section>
            </div>
        </main>
    );
};

export default Contact;
