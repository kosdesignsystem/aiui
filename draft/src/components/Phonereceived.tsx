import "@/styles/Phonereceived.css";
interface PhonereceivedProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Phonereceived = (props: PhonereceivedProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-445_139026", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="445_139026" className="Pixso-symbol-445_139026">
                {is_outline === "false" && (
                    <div
                        id="445_139027"
                        className="Pixso-symbol-445_139027"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="445_139029"
                        className="Pixso-symbol-445_139029"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Phonereceived;
