import React from "react";

interface IInfoProps {
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Info = ({ icon, children }: IInfoProps) => {
    return (
        <article className="flex flex-row gap-5 items-center text-gray-primary">
            <div className="flex items-center justify-center text-2xl bg-transparent ring-4 ring-gray-primary p-2 rounded-full text-inherit">
                {icon}
            </div>
            <p className="text-lg text-gray-primary">{children}</p>
        </article>
    );
};

export default Info;
