import "@/styles/DarkModeyesthemegreentypeaccentsizesmall.css";
interface DarkModeyesthemegreentypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26919?: React.ReactNode;
}
const DarkModeyesthemegreentypeaccentsizesmall = (
    props: DarkModeyesthemegreentypeaccentsizesmallProps
) => {
    const { id, className = "", slot_1_26919 } = props;

    return (
        <div
            className={["component-1_26918", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26918"
                className="Pixso-symbol-1_26918 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26919 ?? (
                    <p
                        id="1_26919"
                        className="Pixso-paragraph-1_26919 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeaccentsizesmall;
