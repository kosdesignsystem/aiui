import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkno.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10653?: React.ReactNode;
    slot_421_10654?: React.ReactNode;
    slot_421_10656?: React.ReactNode;
    slot_421_10657?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkno = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10653,
        slot_421_10654,
        slot_421_10656,
        slot_421_10657
    } = props;

    return (
        <div
            className={["component-421_10576", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10576"
                className="Pixso-symbol-421_10576 pixso-relative-flex"
            >
                <div
                    id="421_10652"
                    className="Pixso-frame-421_10652 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10653 ?? (
                        <p
                            id="421_10653"
                            className="Pixso-paragraph-421_10653 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10654 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10654"
                                className="Pixso-instance-421_10654 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10655"
                    className="Pixso-frame-421_10655 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10656 ?? (
                        <Isoutsidefalse0
                            id="421_10656"
                            className="Pixso-instance-421_10656 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10657 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10657"
                            className="Pixso-instance-421_10657 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkno;
