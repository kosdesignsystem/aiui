import Count2darkmodefalse from "@/components/Count2darkmodefalse";
import Signal5058 from "@/components/Signal5058";
import Typegprsdarkmodefalse from "@/components/Typegprsdarkmodefalse";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import "@/styles/DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkyes.css";
interface DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkyesProps {
    visible_5378_0?: boolean;
    id?: string;
    className?: string;
    slot_421_10627?: React.ReactNode;
    slot_421_10628?: React.ReactNode;
    slot_421_10630?: React.ReactNode;
    slot_421_10631?: React.ReactNode;
    slot_421_10632?: React.ReactNode;
}
const DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkyes = (
    props: DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkyesProps
) => {
    const {
        visible_5378_0 = false,
        id,
        className = "",
        slot_421_10627,
        slot_421_10628,
        slot_421_10630,
        slot_421_10631,
        slot_421_10632
    } = props;

    return (
        <div
            className={["component-421_10572", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10572"
                className="Pixso-symbol-421_10572 pixso-relative-flex"
            >
                <div
                    id="421_10626"
                    className="Pixso-frame-421_10626 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10627 ?? (
                        <p
                            id="421_10627"
                            className="Pixso-paragraph-421_10627 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:52"}
                        </p>
                    )}
                    {slot_421_10628 ??
                        (visible_5378_0 && (
                            <Count2darkmodefalse
                                id="421_10628"
                                className="Pixso-instance-421_10628 pixso-relative-no-shrink"
                            ></Count2darkmodefalse>
                        ))}
                </div>
                <div
                    id="421_10629"
                    className="Pixso-frame-421_10629 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                >
                    {slot_421_10630 ?? (
                        <Signal5058
                            id="421_10630"
                            className="Pixso-instance-421_10630 pixso-relative-no-shrink"
                        ></Signal5058>
                    )}
                    {slot_421_10631 ?? (
                        <Typegprsdarkmodefalse
                            id="421_10631"
                            className="Pixso-instance-421_10631 pixso-relative-no-shrink"
                        ></Typegprsdarkmodefalse>
                    )}
                    {slot_421_10632 ?? (
                        <Darkmodefalseischargingtruechargecount8
                            id="421_10632"
                            className="Pixso-instance-421_10632 pixso-relative-no-shrink"
                        ></Darkmodefalseischargingtruechargecount8>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DarkModenoisAppStatesnoisLocknoisAviafalseisSimyesnetworkyes;
