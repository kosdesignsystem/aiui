import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatedefaultsizemedium.css";
interface TypesubprimarystatedefaultsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1209?: React.ReactNode;
    slot_1_1210?: React.ReactNode;
    slot_1_1211?: React.ReactNode;
    slot_1_1212?: React.ReactNode;
}
const Typesubprimarystatedefaultsizemedium = (
    props: TypesubprimarystatedefaultsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1209,
        slot_1_1210,
        slot_1_1211,
        slot_1_1212
    } = props;

    return (
        <div
            className={["component-1_1208", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1208"
                className="Pixso-symbol-1_1208 pixso-relative-flex"
            >
                {slot_1_1209 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1209"
                            className="Pixso-instance-1_1209 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1210 ?? (
                    <p
                        id="1_1210"
                        className="Pixso-paragraph-1_1210 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1211 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1211"
                            className="Pixso-instance-1_1211 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1212 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1212"
                            className="Pixso-instance-1_1212 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatedefaultsizemedium;
