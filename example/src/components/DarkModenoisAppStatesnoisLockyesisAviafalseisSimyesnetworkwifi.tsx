import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10756?: React.ReactNode;
    slot_421_10757?: React.ReactNode;
    slot_421_10759?: React.ReactNode;
    slot_421_10760?: React.ReactNode;
    slot_421_10761?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10756,
        slot_421_10757,
        slot_421_10759,
        slot_421_10760,
        slot_421_10761
    } = props;

    return (
        <div
            className={["component-421_10595", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10595"
                className="Pixso-symbol-421_10595 pixso-relative-flex"
            >
                <div
                    id="421_10755"
                    className="Pixso-frame-421_10755 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10756 ?? (
                        <p
                            id="421_10756"
                            className="Pixso-paragraph-421_10756 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10757 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10757"
                                className="Pixso-instance-421_10757 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10758"
                    className="Pixso-frame-421_10758 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10759 ?? (
                        <Signal5058
                            id="421_10759"
                            className="Pixso-instance-421_10759 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10760 ?? (
                        <Wifil5062
                            id="421_10760"
                            className="Pixso-instance-421_10760 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10761 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10761"
                            className="Pixso-instance-421_10761 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkwifi;
