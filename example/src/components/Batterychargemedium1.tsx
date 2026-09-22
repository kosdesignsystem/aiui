import "@/styles/Batterychargemedium1.css";
interface Batterychargemedium1Props {
    id?: string;
    className?: string;
}
const Batterychargemedium1 = (props: Batterychargemedium1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9810", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9810"
                className="Pixso-symbol-421_9810 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Batterychargemedium1;
