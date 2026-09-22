import "@/styles/DarkModenothemegreentypeonAccentsizesmall.css";
interface DarkModenothemegreentypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26929?: React.ReactNode;
}
const DarkModenothemegreentypeonAccentsizesmall = (
    props: DarkModenothemegreentypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26929 } = props;

    return (
        <div
            className={["component-1_26928", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26928"
                className="Pixso-symbol-1_26928 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26929 ?? (
                    <p
                        id="1_26929"
                        className="Pixso-paragraph-1_26929 fill-greenprimary-1_30120-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeonAccentsizesmall;
