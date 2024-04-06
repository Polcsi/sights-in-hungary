import Info from "../contact/Info";

// Icons
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

const ContactSection = () => {
    return (
        <section className="w-screen flex flex-col justify-center pt-[5px] pb-[150px] gap-[70px]">
            <h1 className="text-center text-[50px] text-gray-primary font-bold">Kapcsolat</h1>
            <div className="flex flex-row flex-wrap gap-16 justify-center items-center">
                <Info icon={<FaPhone />}>+36 30 123 4567</Info>
                <Info icon={<IoIosMail />}>email@email.email</Info>
                <Info icon={<MdLocationOn />}>Budapest, 1089, Üllői út 38.</Info>
            </div>
        </section>
    );
};

export default ContactSection;
