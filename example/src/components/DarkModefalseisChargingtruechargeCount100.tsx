import Batterychargefull1 from "@/components/Batterychargefull1";
import "@/styles/DarkModefalseisChargingtruechargeCount100.css";
interface DarkModefalseisChargingtruechargeCount100Props {
    id?: string;
    className?: string;
    slot_421_9835?: React.ReactNode;
    slot_421_9836?: React.ReactNode;
}
const DarkModefalseisChargingtruechargeCount100 = (
    props: DarkModefalseisChargingtruechargeCount100Props
) => {
    const { id, className = "", slot_421_9835, slot_421_9836 } = props;

    return (
        <div
            className={["component-421_9834", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9834"
                className="Pixso-symbol-421_9834 pixso-relative-flex"
            >
                {slot_421_9835 ?? (
                    <Batterychargefull1
                        id="421_9835"
                        className="Pixso-instance-421_9835 pixso-relative-no-shrink"
                    ></Batterychargefull1>
                )}
                {slot_421_9836 ?? (
                    <p
                        id="421_9836"
                        className="Pixso-paragraph-421_9836 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"100%"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModefalseisChargingtruechargeCount100;
