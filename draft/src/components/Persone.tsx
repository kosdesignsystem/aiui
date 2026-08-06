import "@/styles/Persone.css";
interface PersoneProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Persone = (props: PersoneProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-213_126719", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="213_126719" className="Pixso-symbol-213_126719">
                {is_outline === "false" && (
                    <div
                        id="213_126720"
                        className="Pixso-symbol-213_126720"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="213_126722"
                        className="Pixso-symbol-213_126722"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Persone;
