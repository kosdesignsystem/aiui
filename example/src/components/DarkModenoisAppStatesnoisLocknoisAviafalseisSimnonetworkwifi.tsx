import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkwifi.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10640?: React.ReactNode;
    slot_421_10641?: React.ReactNode;
    slot_421_10643?: React.ReactNode;
    slot_421_10644?: React.ReactNode;
    slot_421_10645?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkwifi = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10640,
        slot_421_10641,
        slot_421_10643,
        slot_421_10644,
        slot_421_10645
    } = props;

    return (
        <div
            className={["component-421_10574", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10574"
                className="Pixso-symbol-421_10574 pixso-relative-flex"
            >
                <div
                    id="421_10639"
                    className="Pixso-frame-421_10639 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10640 ?? (
                        <p
                            id="421_10640"
                            className="Pixso-paragraph-421_10640 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10641 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10641"
                                className="Pixso-instance-421_10641 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10642"
                    className="Pixso-frame-421_10642 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10643 ?? (
                        <Isoutsidefalse0
                            id="421_10643"
                            className="Pixso-instance-421_10643 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10644 ?? (
                        <Wifil5062
                            id="421_10644"
                            className="Pixso-instance-421_10644 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10645 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10645"
                            className="Pixso-instance-421_10645 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkwifi;
