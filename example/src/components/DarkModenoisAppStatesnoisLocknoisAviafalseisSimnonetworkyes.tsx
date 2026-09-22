import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkyes.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10647?: React.ReactNode;
    slot_421_10648?: React.ReactNode;
    slot_421_10650?: React.ReactNode;
    slot_421_10651?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkyes = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10647,
        slot_421_10648,
        slot_421_10650,
        slot_421_10651
    } = props;

    return (
        <div
            className={["component-421_10575", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10575"
                className="Pixso-symbol-421_10575 pixso-relative-flex"
            >
                <div
                    id="421_10646"
                    className="Pixso-frame-421_10646 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10647 ?? (
                        <p
                            id="421_10647"
                            className="Pixso-paragraph-421_10647 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10648 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10648"
                                className="Pixso-instance-421_10648 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10649"
                    className="Pixso-frame-421_10649 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10650 ?? (
                        <Isoutsidefalse0
                            id="421_10650"
                            className="Pixso-instance-421_10650 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10651 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10651"
                            className="Pixso-instance-421_10651 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimnonetworkyes;
