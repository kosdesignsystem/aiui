import "@/styles/Eyehidden.css";
interface EyehiddenProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Eyehidden = (props: EyehiddenProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-1004_170930", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1004_170930" className="Pixso-symbol-1004_170930">
                {is_outline === "false" && (
                    <div
                        id="1004_170931"
                        className="Pixso-symbol-1004_170931"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="1004_170933"
                        className="Pixso-symbol-1004_170933"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Eyehidden;
