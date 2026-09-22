import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkwifi.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10739?: React.ReactNode;
    slot_421_10741?: React.ReactNode;
    slot_421_10742?: React.ReactNode;
    slot_421_10743?: React.ReactNode;
    slot_421_10744?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkwifi = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10739,
        slot_421_10741,
        slot_421_10742,
        slot_421_10743,
        slot_421_10744
    } = props;

    return (
        <div
            className={["component-421_10592", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10592"
                className="Pixso-symbol-421_10592 pixso-relative-flex"
            >
                {slot_421_10739 ?? (
                    <Appstates
                        id="421_10739"
                        className="Pixso-instance-421_10739 pixso-relative-no-shrink"
                        slot_421_10568={
                            <Statecalling
                                id="421_10568"
                                className="Pixso-instance-421_10568 pixso-relative-no-shrink"
                                slot_421_10554={
                                    <Animatestart
                                        id="421_10554"
                                        className="Pixso-instance-421_10554 pixso-relative-no-shrink"
                                        slot_421_10540={
                                            <div
                                                id="421_10540"
                                                className="Pixso-instance-421_10540 pixso-relative-no-shrink"
                                            ></div>
                                        }
                                    ></Animatestart>
                                }
                            ></Statecalling>
                        }
                    ></Appstates>
                )}
                <div
                    id="421_10740"
                    className="Pixso-frame-421_10740 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10741 ?? (
                        <Isoutsidefalse0
                            id="421_10741"
                            className="Pixso-instance-421_10741 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10742 ?? (
                        <Avia24
                            id="421_10742"
                            className="Pixso-instance-421_10742 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10743 ?? (
                        <Wifil5062
                            id="421_10743"
                            className="Pixso-instance-421_10743 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10744 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10744"
                            className="Pixso-instance-421_10744 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkwifi;
