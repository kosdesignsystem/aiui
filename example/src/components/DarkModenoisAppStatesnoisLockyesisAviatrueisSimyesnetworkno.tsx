import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkno.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10805?: React.ReactNode;
    slot_421_10806?: React.ReactNode;
    slot_421_10808?: React.ReactNode;
    slot_421_10809?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkno = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10805,
        slot_421_10806,
        slot_421_10808,
        slot_421_10809
    } = props;

    return (
        <div
            className={["component-421_10603", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10603"
                className="Pixso-symbol-421_10603 pixso-relative-flex"
            >
                <div
                    id="421_10804"
                    className="Pixso-frame-421_10804 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10805 ?? (
                        <p
                            id="421_10805"
                            className="Pixso-paragraph-421_10805 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10806 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10806"
                                className="Pixso-instance-421_10806 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10807"
                    className="Pixso-frame-421_10807 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10808 ?? (
                        <Avia24
                            id="421_10808"
                            className="Pixso-instance-421_10808 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10809 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10809"
                            className="Pixso-instance-421_10809 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkno;
