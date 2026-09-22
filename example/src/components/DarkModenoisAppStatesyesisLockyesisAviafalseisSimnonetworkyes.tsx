import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkyes.css";
interface DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10848?: React.ReactNode;
    slot_421_10850?: React.ReactNode;
    slot_421_10851?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkyes = (
    props: DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10848,
        slot_421_10850,
        slot_421_10851
    } = props;

    return (
        <div
            className={["component-421_10611", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10611"
                className="Pixso-symbol-421_10611 pixso-relative-flex"
            >
                {slot_421_10848 ?? (
                    <Appstates
                        id="421_10848"
                        className="Pixso-instance-421_10848 pixso-relative-no-shrink"
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
                    id="421_10849"
                    className="Pixso-frame-421_10849 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10850 ?? (
                        <Isoutsidefalse0
                            id="421_10850"
                            className="Pixso-instance-421_10850 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10851 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10851"
                            className="Pixso-instance-421_10851 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviafalseisSimnonetworkyes;
