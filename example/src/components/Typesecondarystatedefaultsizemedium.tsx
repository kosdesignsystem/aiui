import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatedefaultsizemedium.css";
interface TypesecondarystatedefaultsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1249?: React.ReactNode;
    slot_1_1250?: React.ReactNode;
    slot_1_1251?: React.ReactNode;
    slot_1_1252?: React.ReactNode;
}
const Typesecondarystatedefaultsizemedium = (
    props: TypesecondarystatedefaultsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1249,
        slot_1_1250,
        slot_1_1251,
        slot_1_1252
    } = props;

    return (
        <div
            className={["component-1_1248", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1248"
                className="Pixso-symbol-1_1248 pixso-relative-flex"
            >
                {slot_1_1249 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1249"
                            className="Pixso-instance-1_1249 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1250 ?? (
                    <p
                        id="1_1250"
                        className="Pixso-paragraph-1_1250 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1251 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1251"
                            className="Pixso-instance-1_1251 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1252 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1252"
                            className="Pixso-instance-1_1252 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatedefaultsizemedium;
