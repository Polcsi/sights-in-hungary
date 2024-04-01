const FooterBottom = () => {
    return (
        <section className="flex justify-center py-1 text-sm">
            <span>
                &copy; 2024{" "}
                <a
                    href="about:blank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-primary font-medium hover:underline uppercase"
                >
                    látnivalók magyarországon
                </a>
            </span>
        </section>
    );
};

export default FooterBottom;
