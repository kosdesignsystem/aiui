import Battery1001 from "@/components/Battery1001";
import "@/styles/DarkModefalseisChargingfalsechargeCount100.css";
interface DarkModefalseisChargingfalsechargeCount100Props {
    id?: string;
    className?: string;
    slot_421_9844?: React.ReactNode;
    slot_421_9845?: React.ReactNode;
}
const DarkModefalseisChargingfalsechargeCount100 = (
    props: DarkModefalseisChargingfalsechargeCount100Props
) => {
    const { id, className = "", slot_421_9844, slot_421_9845 } = props;

    return (
        <div
            className={["component-421_9843", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9843"
                className="Pixso-symbol-421_9843 pixso-relative-flex"
            >
                {slot_421_9844 ?? (
                    <Battery1001
                        id="421_9844"
                        className="Pixso-instance-421_9844 pixso-relative-no-shrink"
                    ></Battery1001>
                )}
                {slot_421_9845 ?? (
                    <p
                        id="421_9845"
                        className="Pixso-paragraph-421_9845 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"100%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingfalsechargeCount100;
