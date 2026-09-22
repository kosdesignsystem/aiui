import "@/styles/DarkModenothemebluetypegreensizesmall.css";
interface DarkModenothemebluetypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26949?: React.ReactNode;
}
const DarkModenothemebluetypegreensizesmall = (
    props: DarkModenothemebluetypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26949 } = props;

    return (
        <div
            className={["component-1_26948", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26948"
                className="Pixso-symbol-1_26948 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26949 ?? (
                    <p
                        id="1_26949"
                        className="Pixso-paragraph-1_26949 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypegreensizesmall;
