import "@/styles/Persone1.css";
interface Persone1Props {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Persone1 = (props: Persone1Props) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-894_155149", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155149" className="Pixso-symbol-894_155149">
                {is_outline === "false" && (
                    <div
                        id="894_155150"
                        className="Pixso-symbol-894_155150"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="894_155152"
                        className="Pixso-symbol-894_155152"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Persone1;
