import "@/styles/DarkModeyesthemegreentypewarningsizesmall.css";
interface DarkModeyesthemegreentypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26963?: React.ReactNode;
}
const DarkModeyesthemegreentypewarningsizesmall = (
    props: DarkModeyesthemegreentypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26963 } = props;

    return (
        <div
            className={["component-1_26962", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26962"
                className="Pixso-symbol-1_26962 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26963 ?? (
                    <p
                        id="1_26963"
                        className="Pixso-paragraph-1_26963 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypewarningsizesmall;
