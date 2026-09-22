import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkyes.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10799?: React.ReactNode;
    slot_421_10800?: React.ReactNode;
    slot_421_10802?: React.ReactNode;
    slot_421_10803?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkyes = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10799,
        slot_421_10800,
        slot_421_10802,
        slot_421_10803
    } = props;

    return (
        <div
            className={["component-421_10602", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10602"
                className="Pixso-symbol-421_10602 pixso-relative-flex"
            >
                <div
                    id="421_10798"
                    className="Pixso-frame-421_10798 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10799 ?? (
                        <p
                            id="421_10799"
                            className="Pixso-paragraph-421_10799 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10800 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10800"
                                className="Pixso-instance-421_10800 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10801"
                    className="Pixso-frame-421_10801 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10802 ?? (
                        <Avia24
                            id="421_10802"
                            className="Pixso-instance-421_10802 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10803 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10803"
                            className="Pixso-instance-421_10803 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkyes;
