import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkyes.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10875?: React.ReactNode;
    slot_421_10877?: React.ReactNode;
    slot_421_10878?: React.ReactNode;
    slot_421_10879?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkyes = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10875,
        slot_421_10877,
        slot_421_10878,
        slot_421_10879
    } = props;

    return (
        <div
            className={["component-421_10617", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10617"
                className="Pixso-symbol-421_10617 pixso-relative-flex"
            >
                {slot_421_10875 ?? (
                    <Appstates
                        id="421_10875"
                        className="Pixso-instance-421_10875 pixso-relative-no-shrink"
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
                    id="421_10876"
                    className="Pixso-frame-421_10876 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10877 ?? (
                        <Isoutsidefalse0
                            id="421_10877"
                            className="Pixso-instance-421_10877 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10878 ?? (
                        <Avia24
                            id="421_10878"
                            className="Pixso-instance-421_10878 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10879 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10879"
                            className="Pixso-instance-421_10879 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkyes;
