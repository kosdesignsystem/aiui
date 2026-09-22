import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Typegprsdarkmodefalse from "@/components/Typegprsdarkmodefalse";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkyes.css";
interface DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10834?: React.ReactNode;
    slot_421_10836?: React.ReactNode;
    slot_421_10837?: React.ReactNode;
    slot_421_10838?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkyes = (
    props: DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10834,
        slot_421_10836,
        slot_421_10837,
        slot_421_10838
    } = props;

    return (
        <div
            className={["component-421_10608", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10608"
                className="Pixso-symbol-421_10608 pixso-relative-flex"
            >
                {slot_421_10834 ?? (
                    <Appstates
                        id="421_10834"
                        className="Pixso-instance-421_10834 pixso-relative-no-shrink"
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
                    id="421_10835"
                    className="Pixso-frame-421_10835 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10836 ?? (
                        <Signal5058
                            id="421_10836"
                            className="Pixso-instance-421_10836 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10837 ?? (
                        <Typegprsdarkmodefalse
                            id="421_10837"
                            className="Pixso-instance-421_10837 pixso-relative-no-shrink"
                        ></Typegprsdarkmodefalse>
                    )}
                    {slot_421_10838 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10838"
                            className="Pixso-instance-421_10838 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviafalseisSimyesnetworkyes;
