import Batterychargemedium1 from "@/components/Batterychargemedium1";
import "@/styles/DarkModefalseisChargingtruechargeCount50.css";
interface DarkModefalseisChargingtruechargeCount50Props {
    id?: string;
    className?: string;
    slot_421_9832?: React.ReactNode;
    slot_421_9833?: React.ReactNode;
}
const DarkModefalseisChargingtruechargeCount50 = (
    props: DarkModefalseisChargingtruechargeCount50Props
) => {
    const { id, className = "", slot_421_9832, slot_421_9833 } = props;

    return (
        <div
            className={["component-421_9831", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9831"
                className="Pixso-symbol-421_9831 pixso-relative-flex"
            >
                {slot_421_9832 ?? (
                    <Batterychargemedium1
                        id="421_9832"
                        className="Pixso-instance-421_9832 pixso-relative-no-shrink"
                    ></Batterychargemedium1>
                )}
                {slot_421_9833 ?? (
                    <p
                        id="421_9833"
                        className="Pixso-paragraph-421_9833 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"50%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingtruechargeCount50;
