import "@/styles/DarkModeyesthemegreentypegreensizesmall.css";
interface DarkModeyesthemegreentypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26961?: React.ReactNode;
}
const DarkModeyesthemegreentypegreensizesmall = (
    props: DarkModeyesthemegreentypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26961 } = props;

    return (
        <div
            className={["component-1_26960", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26960"
                className="Pixso-symbol-1_26960 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26961 ?? (
                    <p
                        id="1_26961"
                        className="Pixso-paragraph-1_26961 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypegreensizesmall;
