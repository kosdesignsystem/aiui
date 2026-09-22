import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10659?: React.ReactNode;
    slot_421_10660?: React.ReactNode;
    slot_421_10662?: React.ReactNode;
    slot_421_10663?: React.ReactNode;
    slot_421_10664?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10659,
        slot_421_10660,
        slot_421_10662,
        slot_421_10663,
        slot_421_10664
    } = props;

    return (
        <div
            className={["component-421_10577", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10577"
                className="Pixso-symbol-421_10577 pixso-relative-flex"
            >
                <div
                    id="421_10658"
                    className="Pixso-frame-421_10658 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10659 ?? (
                        <p
                            id="421_10659"
                            className="Pixso-paragraph-421_10659 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10660 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10660"
                                className="Pixso-instance-421_10660 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10661"
                    className="Pixso-frame-421_10661 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10662 ?? (
                        <Avia24
                            id="421_10662"
                            className="Pixso-instance-421_10662 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10663 ?? (
                        <Wifil5062
                            id="421_10663"
                            className="Pixso-instance-421_10663 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10664 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10664"
                            className="Pixso-instance-421_10664 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkwifi;
