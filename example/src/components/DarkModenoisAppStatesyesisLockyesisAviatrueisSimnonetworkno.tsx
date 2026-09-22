import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkno.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10880?: React.ReactNode;
    slot_421_10882?: React.ReactNode;
    slot_421_10883?: React.ReactNode;
    slot_421_10884?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkno = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10880,
        slot_421_10882,
        slot_421_10883,
        slot_421_10884
    } = props;

    return (
        <div
            className={["component-421_10618", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10618"
                className="Pixso-symbol-421_10618 pixso-relative-flex"
            >
                {slot_421_10880 ?? (
                    <Appstates
                        id="421_10880"
                        className="Pixso-instance-421_10880 pixso-relative-no-shrink"
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
                    id="421_10881"
                    className="Pixso-frame-421_10881 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10882 ?? (
                        <Isoutsidefalse0
                            id="421_10882"
                            className="Pixso-instance-421_10882 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10883 ?? (
                        <Avia24
                            id="421_10883"
                            className="Pixso-instance-421_10883 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10884 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10884"
                            className="Pixso-instance-421_10884 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimnonetworkno;
