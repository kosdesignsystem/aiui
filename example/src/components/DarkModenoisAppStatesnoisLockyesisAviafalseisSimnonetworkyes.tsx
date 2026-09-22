import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkyes.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10782?: React.ReactNode;
    slot_421_10784?: React.ReactNode;
    slot_421_10785?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkyes = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10782,
        slot_421_10784,
        slot_421_10785
    } = props;

    return (
        <div
            className={["component-421_10599", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10599"
                className="Pixso-symbol-421_10599 pixso-relative-flex"
            >
                <div
                    id="421_10781"
                    className="Pixso-frame-421_10781 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10782 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10782"
                                className="Pixso-instance-421_10782 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10783"
                    className="Pixso-frame-421_10783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10784 ?? (
                        <Isoutsidefalse0
                            id="421_10784"
                            className="Pixso-instance-421_10784 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10785 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10785"
                            className="Pixso-instance-421_10785 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkyes;
