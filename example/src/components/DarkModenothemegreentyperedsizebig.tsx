import "@/styles/DarkModenothemegreentyperedsizebig.css";
interface DarkModenothemegreentyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26854?: React.ReactNode;
}
const DarkModenothemegreentyperedsizebig = (
    props: DarkModenothemegreentyperedsizebigProps
) => {
    const { id, className = "", slot_1_26854 } = props;

    return (
        <div
            className={["component-1_26853", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26853"
                className="Pixso-symbol-1_26853 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26854 ?? (
                    <p
                        id="1_26854"
                        className="Pixso-paragraph-1_26854 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentyperedsizebig;
