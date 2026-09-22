import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkwifi.css";
interface DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10843?: React.ReactNode;
    slot_421_10845?: React.ReactNode;
    slot_421_10846?: React.ReactNode;
    slot_421_10847?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkwifi = (
    props: DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10843,
        slot_421_10845,
        slot_421_10846,
        slot_421_10847
    } = props;

    return (
        <div
            className={["component-421_10610", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10610"
                className="Pixso-symbol-421_10610 pixso-relative-flex"
            >
                {slot_421_10843 ?? (
                    <Appstates
                        id="421_10843"
                        className="Pixso-instance-421_10843 pixso-relative-no-shrink"
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
                    id="421_10844"
                    className="Pixso-frame-421_10844 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10845 ?? (
                        <Isoutsidefalse0
                            id="421_10845"
                            className="Pixso-instance-421_10845 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10846 ?? (
                        <Wifil5062
                            id="421_10846"
                            className="Pixso-instance-421_10846 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10847 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10847"
                            className="Pixso-instance-421_10847 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkwifi;
