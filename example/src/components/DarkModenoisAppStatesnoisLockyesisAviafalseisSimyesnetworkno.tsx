import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkno.css";
interface DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworknoProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10770?: React.ReactNode;
    slot_421_10771?: React.ReactNode;
    slot_421_10773?: React.ReactNode;
    slot_421_10774?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkno = (
    props: DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworknoProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10770,
        slot_421_10771,
        slot_421_10773,
        slot_421_10774
    } = props;

    return (
        <div
            className={["component-421_10597", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10597"
                className="Pixso-symbol-421_10597 pixso-relative-flex"
            >
                <div
                    id="421_10769"
                    className="Pixso-frame-421_10769 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10770 ?? (
                        <p
                            id="421_10770"
                            className="Pixso-paragraph-421_10770 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Megafon"}
                        </p>
                    )}
                    {slot_421_10771 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10771"
                                className="Pixso-instance-421_10771 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10772"
                    className="Pixso-frame-421_10772 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10773 ?? (
                        <Signal5058
                            id="421_10773"
                            className="Pixso-instance-421_10773 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10774 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10774"
                            className="Pixso-instance-421_10774 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLockyesisAviafalseisSimyesnetworkno;
