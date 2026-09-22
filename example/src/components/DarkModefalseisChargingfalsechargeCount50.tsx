import Battery601 from "@/components/Battery601";
import "@/styles/DarkModefalseisChargingfalsechargeCount50.css";
interface DarkModefalseisChargingfalsechargeCount50Props {
    id?: string;
    className?: string;
    slot_421_9841?: React.ReactNode;
    slot_421_9842?: React.ReactNode;
}
const DarkModefalseisChargingfalsechargeCount50 = (
    props: DarkModefalseisChargingfalsechargeCount50Props
) => {
    const { id, className = "", slot_421_9841, slot_421_9842 } = props;

    return (
        <div
            className={["component-421_9840", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9840"
                className="Pixso-symbol-421_9840 pixso-relative-flex"
            >
                {slot_421_9841 ?? (
                    <Battery601
                        id="421_9841"
                        className="Pixso-instance-421_9841 pixso-relative-no-shrink"
                    ></Battery601>
                )}
                {slot_421_9842 ?? (
                    <p
                        id="421_9842"
                        className="Pixso-paragraph-421_9842 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"50%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingfalsechargeCount50;
