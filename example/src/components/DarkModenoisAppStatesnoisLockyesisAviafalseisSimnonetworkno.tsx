import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkno.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10787?: React.ReactNode;
    slot_421_10789?: React.ReactNode;
    slot_421_10790?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkno = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10787,
        slot_421_10789,
        slot_421_10790
    } = props;

    return (
        <div
            className={["component-421_10600", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10600"
                className="Pixso-symbol-421_10600 pixso-relative-flex"
            >
                <div
                    id="421_10786"
                    className="Pixso-frame-421_10786 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10787 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10787"
                                className="Pixso-instance-421_10787 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10788"
                    className="Pixso-frame-421_10788 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10789 ?? (
                        <Isoutsidefalse0
                            id="421_10789"
                            className="Pixso-instance-421_10789 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10790 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10790"
                            className="Pixso-instance-421_10790 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimnonetworkno;
