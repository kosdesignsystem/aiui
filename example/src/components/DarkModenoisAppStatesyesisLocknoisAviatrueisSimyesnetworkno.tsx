import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkno.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10735?: React.ReactNode;
    slot_421_10737?: React.ReactNode;
    slot_421_10738?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkno = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10735,
        slot_421_10737,
        slot_421_10738
    } = props;

    return (
        <div
            className={["component-421_10591", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10591"
                className="Pixso-symbol-421_10591 pixso-relative-flex"
            >
                {slot_421_10735 ?? (
                    <Appstates
                        id="421_10735"
                        className="Pixso-instance-421_10735 pixso-relative-no-shrink"
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
                    id="421_10736"
                    className="Pixso-frame-421_10736 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10737 ?? (
                        <Avia24
                            id="421_10737"
                            className="Pixso-instance-421_10737 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10738 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10738"
                            className="Pixso-instance-421_10738 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkno;
