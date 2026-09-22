import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkyes.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10818?: React.ReactNode;
    slot_421_10820?: React.ReactNode;
    slot_421_10821?: React.ReactNode;
    slot_421_10822?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkyes = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10818,
        slot_421_10820,
        slot_421_10821,
        slot_421_10822
    } = props;

    return (
        <div
            className={["component-421_10605", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10605"
                className="Pixso-symbol-421_10605 pixso-relative-flex"
            >
                <div
                    id="421_10817"
                    className="Pixso-frame-421_10817 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10818 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10818"
                                className="Pixso-instance-421_10818 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10819"
                    className="Pixso-frame-421_10819 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10820 ?? (
                        <Isoutsidefalse0
                            id="421_10820"
                            className="Pixso-instance-421_10820 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10821 ?? (
                        <Avia24
                            id="421_10821"
                            className="Pixso-instance-421_10821 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10822 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10822"
                            className="Pixso-instance-421_10822 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkyes;
