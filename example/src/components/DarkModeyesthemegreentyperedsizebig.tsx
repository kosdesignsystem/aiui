import "@/styles/DarkModeyesthemegreentyperedsizebig.css";
interface DarkModeyesthemegreentyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26856?: React.ReactNode;
}
const DarkModeyesthemegreentyperedsizebig = (
    props: DarkModeyesthemegreentyperedsizebigProps
) => {
    const { id, className = "", slot_1_26856 } = props;

    return (
        <div
            className={["component-1_26855", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26855"
                className="Pixso-symbol-1_26855 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26856 ?? (
                    <p
                        id="1_26856"
                        className="Pixso-paragraph-1_26856 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentyperedsizebig;
