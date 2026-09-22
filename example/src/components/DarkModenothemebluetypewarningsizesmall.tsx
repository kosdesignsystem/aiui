import "@/styles/DarkModenothemebluetypewarningsizesmall.css";
interface DarkModenothemebluetypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26951?: React.ReactNode;
}
const DarkModenothemebluetypewarningsizesmall = (
    props: DarkModenothemebluetypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26951 } = props;

    return (
        <div
            className={["component-1_26950", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26950"
                className="Pixso-symbol-1_26950 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26951 ?? (
                    <p
                        id="1_26951"
                        className="Pixso-paragraph-1_26951 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypewarningsizesmall;
