import Logo from "../../Logo";

const FooterLogo = () => {
    return (
        <section className="bg-gray-primary flex items-center justify-center py-10">
            <Logo
                className="flex-col"
                imageProps={{ className: "w-[300px]" }}
                text={<span className="uppercase font-bold text-2xl text-white">látnivalók magyarországon</span>}
            />
        </section>
    );
};

export default FooterLogo;
