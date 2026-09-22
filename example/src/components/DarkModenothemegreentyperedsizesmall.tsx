import "@/styles/DarkModenothemegreentyperedsizesmall.css";
interface DarkModenothemegreentyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26941?: React.ReactNode;
}
const DarkModenothemegreentyperedsizesmall = (
    props: DarkModenothemegreentyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26941 } = props;

    return (
        <div
            className={["component-1_26940", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26940"
                className="Pixso-symbol-1_26940 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26941 ?? (
                    <p
                        id="1_26941"
                        className="Pixso-paragraph-1_26941 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentyperedsizesmall;
