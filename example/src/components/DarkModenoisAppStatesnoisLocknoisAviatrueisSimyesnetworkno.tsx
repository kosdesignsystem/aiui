import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkno.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10672?: React.ReactNode;
    slot_421_10673?: React.ReactNode;
    slot_421_10675?: React.ReactNode;
    slot_421_10676?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkno = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10672,
        slot_421_10673,
        slot_421_10675,
        slot_421_10676
    } = props;

    return (
        <div
            className={["component-421_10579", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10579"
                className="Pixso-symbol-421_10579 pixso-relative-flex"
            >
                <div
                    id="421_10671"
                    className="Pixso-frame-421_10671 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10672 ?? (
                        <p
                            id="421_10672"
                            className="Pixso-paragraph-421_10672 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10673 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10673"
                                className="Pixso-instance-421_10673 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10674"
                    className="Pixso-frame-421_10674 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10675 ?? (
                        <Avia24
                            id="421_10675"
                            className="Pixso-instance-421_10675 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10676 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10676"
                            className="Pixso-instance-421_10676 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkno;
