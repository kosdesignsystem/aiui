import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkno.css";
interface DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10865?: React.ReactNode;
    slot_421_10867?: React.ReactNode;
    slot_421_10868?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkno = (
    props: DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10865,
        slot_421_10867,
        slot_421_10868
    } = props;

    return (
        <div
            className={["component-421_10615", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10615"
                className="Pixso-symbol-421_10615 pixso-relative-flex"
            >
                {slot_421_10865 ?? (
                    <Appstates
                        id="421_10865"
                        className="Pixso-instance-421_10865 pixso-relative-no-shrink"
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
                    id="421_10866"
                    className="Pixso-frame-421_10866 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10867 ?? (
                        <Avia24
                            id="421_10867"
                            className="Pixso-instance-421_10867 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10868 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10868"
                            className="Pixso-instance-421_10868 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLockyesisAviatrueisSimyesnetworkno;
