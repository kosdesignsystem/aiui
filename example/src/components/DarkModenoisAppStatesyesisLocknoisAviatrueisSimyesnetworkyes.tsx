import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkyes.css";
interface DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10731?: React.ReactNode;
    slot_421_10733?: React.ReactNode;
    slot_421_10734?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkyes = (
    props: DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10731,
        slot_421_10733,
        slot_421_10734
    } = props;

    return (
        <div
            className={["component-421_10590", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10590"
                className="Pixso-symbol-421_10590 pixso-relative-flex"
            >
                {slot_421_10731 ?? (
                    <Appstates
                        id="421_10731"
                        className="Pixso-instance-421_10731 pixso-relative-no-shrink"
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
                    id="421_10732"
                    className="Pixso-frame-421_10732 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10733 ?? (
                        <Avia24
                            id="421_10733"
                            className="Pixso-instance-421_10733 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10734 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10734"
                            className="Pixso-instance-421_10734 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviatrueisSimyesnetworkyes;
