interface RoundButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const RoundButton = (props: RoundButtonProps) => {
    return (
        <button type="button" {...props} className="rounded-full ring-4 ring-light-blue p-2 select-none">
            {props.children}
        </button>
    );
};

export default RoundButton;
