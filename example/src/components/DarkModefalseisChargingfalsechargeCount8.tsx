import Battery101 from "@/components/Battery101";
import "@/styles/DarkModefalseisChargingfalsechargeCount8.css";
interface DarkModefalseisChargingfalsechargeCount8Props {
    id?: string;
    className?: string;
    slot_421_9838?: React.ReactNode;
    slot_421_9839?: React.ReactNode;
}
const DarkModefalseisChargingfalsechargeCount8 = (
    props: DarkModefalseisChargingfalsechargeCount8Props
) => {
    const { id, className = "", slot_421_9838, slot_421_9839 } = props;

    return (
        <div
            className={["component-421_9837", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9837"
                className="Pixso-symbol-421_9837 pixso-relative-flex"
            >
                {slot_421_9838 ?? (
                    <Battery101
                        id="421_9838"
                        className="Pixso-instance-421_9838 pixso-relative-no-shrink"
                    ></Battery101>
                )}
                {slot_421_9839 ?? (
                    <p
                        id="421_9839"
                        className="Pixso-paragraph-421_9839 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"8%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingfalsechargeCount8;
