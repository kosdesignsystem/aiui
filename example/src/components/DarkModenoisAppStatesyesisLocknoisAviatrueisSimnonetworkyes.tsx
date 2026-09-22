import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkyes.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10745?: React.ReactNode;
    slot_421_10747?: React.ReactNode;
    slot_421_10748?: React.ReactNode;
    slot_421_10749?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkyes = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10745,
        slot_421_10747,
        slot_421_10748,
        slot_421_10749
    } = props;

    return (
        <div
            className={["component-421_10593", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10593"
                className="Pixso-symbol-421_10593 pixso-relative-flex"
            >
                {slot_421_10745 ?? (
                    <Appstates
                        id="421_10745"
                        className="Pixso-instance-421_10745 pixso-relative-no-shrink"
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
                    id="421_10746"
                    className="Pixso-frame-421_10746 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10747 ?? (
                        <Isoutsidefalse0
                            id="421_10747"
                            className="Pixso-instance-421_10747 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10748 ?? (
                        <Avia24
                            id="421_10748"
                            className="Pixso-instance-421_10748 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10749 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10749"
                            className="Pixso-instance-421_10749 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimnonetworkyes;
