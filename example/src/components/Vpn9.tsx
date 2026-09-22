import "@/styles/Vpn9.css";
interface Vpn9Props {
    id?: string;
    className?: string;
}
const Vpn9 = (props: Vpn9Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10333", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10333"
                className="Pixso-symbol-1_10333 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Vpn9;
