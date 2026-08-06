import "@/styles/Shield.css";
interface ShieldProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Shield = (props: ShieldProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-807_152534", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="807_152534" className="Pixso-symbol-807_152534">
                {is_outline === "false" && (
                    <div
                        id="807_152535"
                        className="Pixso-symbol-807_152535"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="807_152537"
                        className="Pixso-symbol-807_152537"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Shield;
