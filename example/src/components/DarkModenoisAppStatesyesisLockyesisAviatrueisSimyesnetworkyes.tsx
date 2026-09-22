import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkyes.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10861?: React.ReactNode;
    slot_421_10863?: React.ReactNode;
    slot_421_10864?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkyes = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10861,
        slot_421_10863,
        slot_421_10864
    } = props;

    return (
        <div
            className={["component-421_10614", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10614"
                className="Pixso-symbol-421_10614 pixso-relative-flex"
            >
                {slot_421_10861 ?? (
                    <Appstates
                        id="421_10861"
                        className="Pixso-instance-421_10861 pixso-relative-no-shrink"
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
                    id="421_10862"
                    className="Pixso-frame-421_10862 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10863 ?? (
                        <Avia24
                            id="421_10863"
                            className="Pixso-instance-421_10863 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10864 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10864"
                            className="Pixso-instance-421_10864 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkyes;
