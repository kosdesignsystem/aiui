import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkyes.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10666?: React.ReactNode;
    slot_421_10667?: React.ReactNode;
    slot_421_10669?: React.ReactNode;
    slot_421_10670?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkyes = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10666,
        slot_421_10667,
        slot_421_10669,
        slot_421_10670
    } = props;

    return (
        <div
            className={["component-421_10578", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10578"
                className="Pixso-symbol-421_10578 pixso-relative-flex"
            >
                <div
                    id="421_10665"
                    className="Pixso-frame-421_10665 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10666 ?? (
                        <p
                            id="421_10666"
                            className="Pixso-paragraph-421_10666 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10667 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10667"
                                className="Pixso-instance-421_10667 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10668"
                    className="Pixso-frame-421_10668 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10669 ?? (
                        <Avia24
                            id="421_10669"
                            className="Pixso-instance-421_10669 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10670 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10670"
                            className="Pixso-instance-421_10670 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimyesnetworkyes;
