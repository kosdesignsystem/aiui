import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkno.css";
interface DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10722?: React.ReactNode;
    slot_421_10724?: React.ReactNode;
    slot_421_10725?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkno = (
    props: DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10722,
        slot_421_10724,
        slot_421_10725
    } = props;

    return (
        <div
            className={["component-421_10588", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10588"
                className="Pixso-symbol-421_10588 pixso-relative-flex"
            >
                {slot_421_10722 ?? (
                    <Appstates
                        id="421_10722"
                        className="Pixso-instance-421_10722 pixso-relative-no-shrink"
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
                    id="421_10723"
                    className="Pixso-frame-421_10723 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10724 ?? (
                        <Isoutsidefalse0
                            id="421_10724"
                            className="Pixso-instance-421_10724 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10725 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10725"
                            className="Pixso-instance-421_10725 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviafalseisSimnonetworkno;
