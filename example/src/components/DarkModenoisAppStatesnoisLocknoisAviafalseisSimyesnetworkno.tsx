import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkno.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10634?: React.ReactNode;
    slot_421_10635?: React.ReactNode;
    slot_421_10637?: React.ReactNode;
    slot_421_10638?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkno = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10634,
        slot_421_10635,
        slot_421_10637,
        slot_421_10638
    } = props;

    return (
        <div
            className={["component-421_10573", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10573"
                className="Pixso-symbol-421_10573 pixso-relative-flex"
            >
                <div
                    id="421_10633"
                    className="Pixso-frame-421_10633 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10634 ?? (
                        <p
                            id="421_10634"
                            className="Pixso-paragraph-421_10634 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10635 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10635"
                                className="Pixso-instance-421_10635 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10636"
                    className="Pixso-frame-421_10636 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10637 ?? (
                        <Signal5058
                            id="421_10637"
                            className="Pixso-instance-421_10637 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10638 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10638"
                            className="Pixso-instance-421_10638 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkno;
