import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Avia24 from "@/components/Avia24";
import Wifil5062 from "@/components/Wifil5062";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkwifi.css";
interface DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkwifiProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10792?: React.ReactNode;
    slot_421_10793?: React.ReactNode;
    slot_421_10795?: React.ReactNode;
    slot_421_10796?: React.ReactNode;
    slot_421_10797?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkwifi = (
    props: DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkwifiProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10792,
        slot_421_10793,
        slot_421_10795,
        slot_421_10796,
        slot_421_10797
    } = props;

    return (
        <div
            className={["component-421_10601", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10601"
                className="Pixso-symbol-421_10601 pixso-relative-flex"
            >
                <div
                    id="421_10791"
                    className="Pixso-frame-421_10791 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10792 ?? (
                        <p
                            id="421_10792"
                            className="Pixso-paragraph-421_10792 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10793 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10793"
                                className="Pixso-instance-421_10793 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10794"
                    className="Pixso-frame-421_10794 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10795 ?? (
                        <Avia24
                            id="421_10795"
                            className="Pixso-instance-421_10795 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10796 ?? (
                        <Wifil5062
                            id="421_10796"
                            className="Pixso-instance-421_10796 pixso-relative-no-shrink"
                        ></Wifil5062>
                    )}
                    {slot_421_10797 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10797"
                            className="Pixso-instance-421_10797 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviatrueisSimyesnetworkwifi;
