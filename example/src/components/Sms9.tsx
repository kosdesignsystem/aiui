import "@/styles/Sms9.css";
interface Sms9Props {
    id?: string;
    className?: string;
}
const Sms9 = (props: Sms9Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10252", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10252"
                className="Pixso-symbol-1_10252 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Sms9;
