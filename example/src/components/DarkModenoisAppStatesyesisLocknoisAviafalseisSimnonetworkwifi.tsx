import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkwifi.css";
interface DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10713?: React.ReactNode;
    slot_421_10715?: React.ReactNode;
    slot_421_10716?: React.ReactNode;
    slot_421_10717?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkwifi = (
    props: DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10713,
        slot_421_10715,
        slot_421_10716,
        slot_421_10717
    } = props;

    return (
        <div
            className={["component-421_10586", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10586"
                className="Pixso-symbol-421_10586 pixso-relative-flex"
            >
                {slot_421_10713 ?? (
                    <Appstates
                        id="421_10713"
                        className="Pixso-instance-421_10713 pixso-relative-no-shrink"
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
                    id="421_10714"
                    className="Pixso-frame-421_10714 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10715 ?? (
                        <Isoutsidefalse0
                            id="421_10715"
                            className="Pixso-instance-421_10715 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10716 ?? (
                        <Wifil5062
                            id="421_10716"
                            className="Pixso-instance-421_10716 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10717 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10717"
                            className="Pixso-instance-421_10717 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkwifi;
