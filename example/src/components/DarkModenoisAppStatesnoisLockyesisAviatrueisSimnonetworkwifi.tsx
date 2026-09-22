import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkwifi.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10811?: React.ReactNode;
    slot_421_10813?: React.ReactNode;
    slot_421_10814?: React.ReactNode;
    slot_421_10815?: React.ReactNode;
    slot_421_10816?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkwifi = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10811,
        slot_421_10813,
        slot_421_10814,
        slot_421_10815,
        slot_421_10816
    } = props;

    return (
        <div
            className={["component-421_10604", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10604"
                className="Pixso-symbol-421_10604 pixso-relative-flex"
            >
                <div
                    id="421_10810"
                    className="Pixso-frame-421_10810 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10811 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10811"
                                className="Pixso-instance-421_10811 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10812"
                    className="Pixso-frame-421_10812 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10813 ?? (
                        <Isoutsidefalse0
                            id="421_10813"
                            className="Pixso-instance-421_10813 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10814 ?? (
                        <Avia24
                            id="421_10814"
                            className="Pixso-instance-421_10814 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10815 ?? (
                        <Wifil5062
                            id="421_10815"
                            className="Pixso-instance-421_10815 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10816 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10816"
                            className="Pixso-instance-421_10816 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkwifi;
