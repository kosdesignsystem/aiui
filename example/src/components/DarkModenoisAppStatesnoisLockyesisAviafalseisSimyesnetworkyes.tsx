import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Typegprsdarkmodefalse from "@/components/Typegprsdarkmodefalse";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkyes.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10763?: React.ReactNode;
    slot_421_10764?: React.ReactNode;
    slot_421_10766?: React.ReactNode;
    slot_421_10767?: React.ReactNode;
    slot_421_10768?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkyes = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10763,
        slot_421_10764,
        slot_421_10766,
        slot_421_10767,
        slot_421_10768
    } = props;

    return (
        <div
            className={["component-421_10596", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10596"
                className="Pixso-symbol-421_10596 pixso-relative-flex"
            >
                <div
                    id="421_10762"
                    className="Pixso-frame-421_10762 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10763 ?? (
                        <p
                            id="421_10763"
                            className="Pixso-paragraph-421_10763 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10764 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10764"
                                className="Pixso-instance-421_10764 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10765"
                    className="Pixso-frame-421_10765 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10766 ?? (
                        <Signal5058
                            id="421_10766"
                            className="Pixso-instance-421_10766 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10767 ?? (
                        <Typegprsdarkmodefalse
                            id="421_10767"
                            className="Pixso-instance-421_10767 pixso-relative-no-shrink"
                        ></Typegprsdarkmodefalse>
                    )}
                    {slot_421_10768 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10768"
                            className="Pixso-instance-421_10768 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkyes;
