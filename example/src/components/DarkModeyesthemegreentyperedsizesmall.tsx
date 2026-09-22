import "@/styles/DarkModeyesthemegreentyperedsizesmall.css";
interface DarkModeyesthemegreentyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26943?: React.ReactNode;
}
const DarkModeyesthemegreentyperedsizesmall = (
    props: DarkModeyesthemegreentyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26943 } = props;

    return (
        <div
            className={["component-1_26942", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26942"
                className="Pixso-symbol-1_26942 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26943 ?? (
                    <p
                        id="1_26943"
                        className="Pixso-paragraph-1_26943 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentyperedsizesmall;
