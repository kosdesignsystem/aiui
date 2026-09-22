import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10699?: React.ReactNode;
    slot_421_10701?: React.ReactNode;
    slot_421_10702?: React.ReactNode;
    slot_421_10703?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10699,
        slot_421_10701,
        slot_421_10702,
        slot_421_10703
    } = props;

    return (
        <div
            className={["component-421_10583", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10583"
                className="Pixso-symbol-421_10583 pixso-relative-flex"
            >
                {slot_421_10699 ?? (
                    <Appstates
                        id="421_10699"
                        className="Pixso-instance-421_10699 pixso-relative-no-shrink"
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
                    id="421_10700"
                    className="Pixso-frame-421_10700 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10701 ?? (
                        <Signal5058
                            id="421_10701"
                            className="Pixso-instance-421_10701 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10702 ?? (
                        <Wifil5062
                            id="421_10702"
                            className="Pixso-instance-421_10702 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10703 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10703"
                            className="Pixso-instance-421_10703 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkwifi;
