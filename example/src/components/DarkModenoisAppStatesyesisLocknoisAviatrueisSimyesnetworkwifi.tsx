import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10726?: React.ReactNode;
    slot_421_10728?: React.ReactNode;
    slot_421_10729?: React.ReactNode;
    slot_421_10730?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10726,
        slot_421_10728,
        slot_421_10729,
        slot_421_10730
    } = props;

    return (
        <div
            className={["component-421_10589", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10589"
                className="Pixso-symbol-421_10589 pixso-relative-flex"
            >
                {slot_421_10726 ?? (
                    <Appstates
                        id="421_10726"
                        className="Pixso-instance-421_10726 pixso-relative-no-shrink"
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
                    id="421_10727"
                    className="Pixso-frame-421_10727 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10728 ?? (
                        <Avia24
                            id="421_10728"
                            className="Pixso-instance-421_10728 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10729 ?? (
                        <Wifil5062
                            id="421_10729"
                            className="Pixso-instance-421_10729 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10730 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10730"
                            className="Pixso-instance-421_10730 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkwifi;
