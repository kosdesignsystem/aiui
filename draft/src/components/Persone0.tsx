import "@/styles/Persone0.css";
interface Persone0Props {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Persone0 = (props: Persone0Props) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-445_139031", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="445_139031" className="Pixso-symbol-445_139031">
                {is_outline === "false" && (
                    <div
                        id="445_139032"
                        className="Pixso-symbol-445_139032"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="445_139034"
                        className="Pixso-symbol-445_139034"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Persone0;
