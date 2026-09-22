import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Typegprsdarkmodefalse from "@/components/Typegprsdarkmodefalse";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkyes.css";
interface DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10704?: React.ReactNode;
    slot_421_10706?: React.ReactNode;
    slot_421_10707?: React.ReactNode;
    slot_421_10708?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkyes = (
    props: DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10704,
        slot_421_10706,
        slot_421_10707,
        slot_421_10708
    } = props;

    return (
        <div
            className={["component-421_10584", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10584"
                className="Pixso-symbol-421_10584 pixso-relative-flex"
            >
                {slot_421_10704 ?? (
                    <Appstates
                        id="421_10704"
                        className="Pixso-instance-421_10704 pixso-relative-no-shrink"
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
                    id="421_10705"
                    className="Pixso-frame-421_10705 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10706 ?? (
                        <Signal5058
                            id="421_10706"
                            className="Pixso-instance-421_10706 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10707 ?? (
                        <Typegprsdarkmodefalse
                            id="421_10707"
                            className="Pixso-instance-421_10707 pixso-relative-no-shrink"
                        ></Typegprsdarkmodefalse>
                    )}
                    {slot_421_10708 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10708"
                            className="Pixso-instance-421_10708 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkyes;
