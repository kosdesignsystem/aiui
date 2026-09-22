import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10620?: React.ReactNode;
    slot_421_10621?: React.ReactNode;
    slot_421_10623?: React.ReactNode;
    slot_421_10624?: React.ReactNode;
    slot_421_10625?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10620,
        slot_421_10621,
        slot_421_10623,
        slot_421_10624,
        slot_421_10625
    } = props;

    return (
        <div
            className={["component-421_10571", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10571"
                className="Pixso-symbol-421_10571 pixso-relative-flex"
            >
                <div
                    id="421_10619"
                    className="Pixso-frame-421_10619 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10620 ?? (
                        <p
                            id="421_10620"
                            className="Pixso-paragraph-421_10620 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10621 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10621"
                                className="Pixso-instance-421_10621 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10622"
                    className="Pixso-frame-421_10622 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10623 ?? (
                        <Signal5058
                            id="421_10623"
                            className="Pixso-instance-421_10623 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10624 ?? (
                        <Wifil5062
                            id="421_10624"
                            className="Pixso-instance-421_10624 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10625 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10625"
                            className="Pixso-instance-421_10625 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkwifi;
