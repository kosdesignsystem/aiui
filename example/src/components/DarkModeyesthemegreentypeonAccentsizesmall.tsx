import "@/styles/DarkModeyesthemegreentypeonAccentsizesmall.css";
interface DarkModeyesthemegreentypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26931?: React.ReactNode;
}
const DarkModeyesthemegreentypeonAccentsizesmall = (
    props: DarkModeyesthemegreentypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26931 } = props;

    return (
        <div
            className={["component-1_26930", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26930"
                className="Pixso-symbol-1_26930 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26931 ?? (
                    <p
                        id="1_26931"
                        className="Pixso-paragraph-1_26931 fill-greenprimary-1_30120-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeonAccentsizesmall;
