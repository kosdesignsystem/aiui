import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkwifi.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10869?: React.ReactNode;
    slot_421_10871?: React.ReactNode;
    slot_421_10872?: React.ReactNode;
    slot_421_10873?: React.ReactNode;
    slot_421_10874?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkwifi = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10869,
        slot_421_10871,
        slot_421_10872,
        slot_421_10873,
        slot_421_10874
    } = props;

    return (
        <div
            className={["component-421_10616", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10616"
                className="Pixso-symbol-421_10616 pixso-relative-flex"
            >
                {slot_421_10869 ?? (
                    <Appstates
                        id="421_10869"
                        className="Pixso-instance-421_10869 pixso-relative-no-shrink"
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
                    id="421_10870"
                    className="Pixso-frame-421_10870 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10871 ?? (
                        <Isoutsidefalse0
                            id="421_10871"
                            className="Pixso-instance-421_10871 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10872 ?? (
                        <Avia24
                            id="421_10872"
                            className="Pixso-instance-421_10872 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10873 ?? (
                        <Wifil5062
                            id="421_10873"
                            className="Pixso-instance-421_10873 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10874 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10874"
                            className="Pixso-instance-421_10874 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkwifi;
