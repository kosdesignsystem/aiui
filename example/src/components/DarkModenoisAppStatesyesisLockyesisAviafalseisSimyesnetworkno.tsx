import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkno.css";
interface DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10839?: React.ReactNode;
    slot_421_10841?: React.ReactNode;
    slot_421_10842?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkno = (
    props: DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10839,
        slot_421_10841,
        slot_421_10842
    } = props;

    return (
        <div
            className={["component-421_10609", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10609"
                className="Pixso-symbol-421_10609 pixso-relative-flex"
            >
                {slot_421_10839 ?? (
                    <Appstates
                        id="421_10839"
                        className="Pixso-instance-421_10839 pixso-relative-no-shrink"
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
                    id="421_10840"
                    className="Pixso-frame-421_10840 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10841 ?? (
                        <Signal5058
                            id="421_10841"
                            className="Pixso-instance-421_10841 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10842 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10842"
                            className="Pixso-instance-421_10842 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkno;
