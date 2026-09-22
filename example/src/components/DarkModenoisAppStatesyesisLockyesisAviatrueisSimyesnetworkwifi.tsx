import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10856?: React.ReactNode;
    slot_421_10858?: React.ReactNode;
    slot_421_10859?: React.ReactNode;
    slot_421_10860?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10856,
        slot_421_10858,
        slot_421_10859,
        slot_421_10860
    } = props;

    return (
        <div
            className={["component-421_10613", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10613"
                className="Pixso-symbol-421_10613 pixso-relative-flex"
            >
                {slot_421_10856 ?? (
                    <Appstates
                        id="421_10856"
                        className="Pixso-instance-421_10856 pixso-relative-no-shrink"
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
                    id="421_10857"
                    className="Pixso-frame-421_10857 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10858 ?? (
                        <Avia24
                            id="421_10858"
                            className="Pixso-instance-421_10858 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10859 ?? (
                        <Wifil5062
                            id="421_10859"
                            className="Pixso-instance-421_10859 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10860 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10860"
                            className="Pixso-instance-421_10860 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkwifi;
