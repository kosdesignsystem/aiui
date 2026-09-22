import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkno.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10750?: React.ReactNode;
    slot_421_10752?: React.ReactNode;
    slot_421_10753?: React.ReactNode;
    slot_421_10754?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkno = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10750,
        slot_421_10752,
        slot_421_10753,
        slot_421_10754
    } = props;

    return (
        <div
            className={["component-421_10594", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10594"
                className="Pixso-symbol-421_10594 pixso-relative-flex"
            >
                {slot_421_10750 ?? (
                    <Appstates
                        id="421_10750"
                        className="Pixso-instance-421_10750 pixso-relative-no-shrink"
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
                    id="421_10751"
                    className="Pixso-frame-421_10751 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10752 ?? (
                        <Isoutsidefalse0
                            id="421_10752"
                            className="Pixso-instance-421_10752 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10753 ?? (
                        <Avia24
                            id="421_10753"
                            className="Pixso-instance-421_10753 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10754 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10754"
                            className="Pixso-instance-421_10754 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkno;
