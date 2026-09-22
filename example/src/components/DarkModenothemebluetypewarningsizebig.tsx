import "@/styles/DarkModenothemebluetypewarningsizebig.css";
interface DarkModenothemebluetypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26864?: React.ReactNode;
}
const DarkModenothemebluetypewarningsizebig = (
    props: DarkModenothemebluetypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26864 } = props;

    return (
        <div
            className={["component-1_26863", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26863"
                className="Pixso-symbol-1_26863 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26864 ?? (
                    <p
                        id="1_26864"
                        className="Pixso-paragraph-1_26864 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypewarningsizebig;
