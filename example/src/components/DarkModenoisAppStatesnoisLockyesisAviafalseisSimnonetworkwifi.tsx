import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkwifi.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10776?: React.ReactNode;
    slot_421_10778?: React.ReactNode;
    slot_421_10779?: React.ReactNode;
    slot_421_10780?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkwifi = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10776,
        slot_421_10778,
        slot_421_10779,
        slot_421_10780
    } = props;

    return (
        <div
            className={["component-421_10598", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10598"
                className="Pixso-symbol-421_10598 pixso-relative-flex"
            >
                <div
                    id="421_10775"
                    className="Pixso-frame-421_10775 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10776 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10776"
                                className="Pixso-instance-421_10776 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10777"
                    className="Pixso-frame-421_10777 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10778 ?? (
                        <Isoutsidefalse0
                            id="421_10778"
                            className="Pixso-instance-421_10778 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10779 ?? (
                        <Wifil5062
                            id="421_10779"
                            className="Pixso-instance-421_10779 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10780 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10780"
                            className="Pixso-instance-421_10780 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkwifi;
