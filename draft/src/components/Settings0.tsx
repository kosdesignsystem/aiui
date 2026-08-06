import "@/styles/Settings0.css";
interface Settings0Props {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Settings0 = (props: Settings0Props) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-188_119798", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="188_119798" className="Pixso-symbol-188_119798">
                {is_outline === "false" && (
                    <div
                        id="188_119799"
                        className="Pixso-symbol-188_119799"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="188_119801"
                        className="Pixso-symbol-188_119801"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Settings0;
