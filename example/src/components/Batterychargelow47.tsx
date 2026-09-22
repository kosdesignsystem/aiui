import "@/styles/Batterychargelow47.css";
interface Batterychargelow47Props {
    id?: string;
    className?: string;
}
const Batterychargelow47 = (props: Batterychargelow47Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9807", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9807"
                className="Pixso-symbol-421_9807 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Batterychargelow47;
