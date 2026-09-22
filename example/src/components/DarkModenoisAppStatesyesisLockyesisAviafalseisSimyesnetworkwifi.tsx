import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10829?: React.ReactNode;
    slot_421_10831?: React.ReactNode;
    slot_421_10832?: React.ReactNode;
    slot_421_10833?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10829,
        slot_421_10831,
        slot_421_10832,
        slot_421_10833
    } = props;

    return (
        <div
            className={["component-421_10607", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10607"
                className="Pixso-symbol-421_10607 pixso-relative-flex"
            >
                {slot_421_10829 ?? (
                    <Appstates
                        id="421_10829"
                        className="Pixso-instance-421_10829 pixso-relative-no-shrink"
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
                    id="421_10830"
                    className="Pixso-frame-421_10830 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10831 ?? (
                        <Signal5058
                            id="421_10831"
                            className="Pixso-instance-421_10831 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10832 ?? (
                        <Wifil5062
                            id="421_10832"
                            className="Pixso-instance-421_10832 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10833 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10833"
                            className="Pixso-instance-421_10833 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkwifi;
