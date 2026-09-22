import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkno.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10824?: React.ReactNode;
    slot_421_10826?: React.ReactNode;
    slot_421_10827?: React.ReactNode;
    slot_421_10828?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkno = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10824,
        slot_421_10826,
        slot_421_10827,
        slot_421_10828
    } = props;

    return (
        <div
            className={["component-421_10606", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10606"
                className="Pixso-symbol-421_10606 pixso-relative-flex"
            >
                <div
                    id="421_10823"
                    className="Pixso-frame-421_10823 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10824 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10824"
                                className="Pixso-instance-421_10824 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10825"
                    className="Pixso-frame-421_10825 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10826 ?? (
                        <Isoutsidefalse0
                            id="421_10826"
                            className="Pixso-instance-421_10826 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10827 ?? (
                        <Avia24
                            id="421_10827"
                            className="Pixso-instance-421_10827 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10828 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10828"
                            className="Pixso-instance-421_10828 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimnonetworkno;
