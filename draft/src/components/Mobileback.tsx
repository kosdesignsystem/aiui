import "@/styles/Mobileback.css";
interface MobilebackProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Mobileback = (props: MobilebackProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-431_164018", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_164018" className="Pixso-symbol-431_164018">
                {is_outline === "false" && (
                    <div
                        id="431_164019"
                        className="Pixso-symbol-431_164019"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="431_164021"
                        className="Pixso-symbol-431_164021"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Mobileback;
