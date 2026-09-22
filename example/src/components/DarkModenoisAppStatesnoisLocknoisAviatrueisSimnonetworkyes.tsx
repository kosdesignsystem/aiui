import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Isoutsidefalse0 from "@/components/Isoutsidefalse0";
import Avia24 from "@/components/Avia24";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkyes.css";
interface DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10686?: React.ReactNode;
    slot_421_10687?: React.ReactNode;
    slot_421_10689?: React.ReactNode;
    slot_421_10690?: React.ReactNode;
    slot_421_10691?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkyes = (
    props: DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10686,
        slot_421_10687,
        slot_421_10689,
        slot_421_10690,
        slot_421_10691
    } = props;

    return (
        <div
            className={["component-421_10581", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10581"
                className="Pixso-symbol-421_10581 pixso-relative-flex"
            >
                <div
                    id="421_10685"
                    className="Pixso-frame-421_10685 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10686 ?? (
                        <p
                            id="421_10686"
                            className="Pixso-paragraph-421_10686 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10687 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10687"
                                className="Pixso-instance-421_10687 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10688"
                    className="Pixso-frame-421_10688 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10689 ?? (
                        <Isoutsidefalse0
                            id="421_10689"
                            className="Pixso-instance-421_10689 pixso-relative-no-shrink"
                        ></Isoutsidefalse0>
                    )}
                    {slot_421_10690 ?? (
                        <Avia24
                            id="421_10690"
                            className="Pixso-instance-421_10690 pixso-relative-no-shrink"
                        ></Avia24>
                    )}
                    {slot_421_10691 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10691"
                            className="Pixso-instance-421_10691 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviatrueisSimnonetworkyes;
