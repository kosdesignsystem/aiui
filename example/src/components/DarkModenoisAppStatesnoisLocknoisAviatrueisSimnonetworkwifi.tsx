import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkwifi.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10678?: React.ReactNode;
    slot_421_10679?: React.ReactNode;
    slot_421_10681?: React.ReactNode;
    slot_421_10682?: React.ReactNode;
    slot_421_10683?: React.ReactNode;
    slot_421_10684?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkwifi = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10678,
        slot_421_10679,
        slot_421_10681,
        slot_421_10682,
        slot_421_10683,
        slot_421_10684
    } = props;

    return (
        <div
            className={["component-421_10580", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10580"
                className="Pixso-symbol-421_10580 pixso-relative-flex"
            >
                <div
                    id="421_10677"
                    className="Pixso-frame-421_10677 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10678 ?? (
                        <p
                            id="421_10678"
                            className="Pixso-paragraph-421_10678 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10679 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10679"
                                className="Pixso-instance-421_10679 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10680"
                    className="Pixso-frame-421_10680 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10681 ?? (
                        <Isoutsidefalse0
                            id="421_10681"
                            className="Pixso-instance-421_10681 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10682 ?? (
                        <Avia24
                            id="421_10682"
                            className="Pixso-instance-421_10682 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10683 ?? (
                        <Wifil5062
                            id="421_10683"
                            className="Pixso-instance-421_10683 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10684 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10684"
                            className="Pixso-instance-421_10684 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkwifi;
