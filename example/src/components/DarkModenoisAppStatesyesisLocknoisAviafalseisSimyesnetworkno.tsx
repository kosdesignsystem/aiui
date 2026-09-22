import Appstates from "@/components/Appstates";
import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Signal5058 from "@/components/Signal5058";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkno.css";
interface DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10709?: React.ReactNode;
    slot_421_10711?: React.ReactNode;
    slot_421_10712?: React.ReactNode;
}
const DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkno = (
    props: DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10709,
        slot_421_10711,
        slot_421_10712
    } = props;

    return (
        <div
            className={["component-421_10585", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10585"
                className="Pixso-symbol-421_10585 pixso-relative-flex"
            >
                {slot_421_10709 ?? (
                    <Appstates
                        id="421_10709"
                        className="Pixso-instance-421_10709 pixso-relative-no-shrink"
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
                    id="421_10710"
                    className="Pixso-frame-421_10710 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10711 ?? (
                        <Signal5058
                            id="421_10711"
                            className="Pixso-instance-421_10711 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10712 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10712"
                            className="Pixso-instance-421_10712 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesyesisLocknoisAviafalseisSimyesnetworkno;
