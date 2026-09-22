import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkno.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10693?: React.ReactNode;
    slot_421_10694?: React.ReactNode;
    slot_421_10696?: React.ReactNode;
    slot_421_10697?: React.ReactNode;
    slot_421_10698?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkno = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10693,
        slot_421_10694,
        slot_421_10696,
        slot_421_10697,
        slot_421_10698
    } = props;

    return (
        <div
            className={["component-421_10582", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10582"
                className="Pixso-symbol-421_10582 pixso-relative-flex"
            >
                <div
                    id="421_10692"
                    className="Pixso-frame-421_10692 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10693 ?? (
                        <p
                            id="421_10693"
                            className="Pixso-paragraph-421_10693 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10694 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10694"
                                className="Pixso-instance-421_10694 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10695"
                    className="Pixso-frame-421_10695 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10696 ?? (
                        <Isoutsidefalse0
                            id="421_10696"
                            className="Pixso-instance-421_10696 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10697 ?? (
                        <Avia24
                            id="421_10697"
                            className="Pixso-instance-421_10697 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10698 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10698"
                            className="Pixso-instance-421_10698 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkno;
