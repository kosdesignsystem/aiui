import "@/styles/Mobilehome.css";
interface MobilehomeProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Mobilehome = (props: MobilehomeProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-431_164013", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_164013" className="Pixso-symbol-431_164013">
                {is_outline === "false" && (
                    <div
                        id="431_164014"
                        className="Pixso-symbol-431_164014"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="431_164016"
                        className="Pixso-symbol-431_164016"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Mobilehome;
