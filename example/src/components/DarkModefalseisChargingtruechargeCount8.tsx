import Batterychargelow47 from "@/components/Batterychargelow47";
import "@/styles/DarkModefalseisChargingtruechargeCount8.css";
interface DarkModefalseisChargingtruechargeCount8Props {
    id?: string;
    className?: string;
    slot_421_9829?: React.ReactNode;
    slot_421_9830?: React.ReactNode;
}
const DarkModefalseisChargingtruechargeCount8 = (
    props: DarkModefalseisChargingtruechargeCount8Props
) => {
    const { id, className = "", slot_421_9829, slot_421_9830 } = props;

    return (
        <div
            className={["component-421_9828", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9828"
                className="Pixso-symbol-421_9828 pixso-relative-flex"
            >
                {slot_421_9829 ?? (
                    <Batterychargelow47
                        id="421_9829"
                        className="Pixso-instance-421_9829 pixso-relative-no-shrink"
                    ></Batterychargelow47>
                )}
                {slot_421_9830 ?? (
                    <p
                        id="421_9830"
                        className="Pixso-paragraph-421_9830 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"8%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingtruechargeCount8;
