import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizebig from "@/components/Typedefaultsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatefocussizebig.css";
interface TypedefaultstatefocussizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1134?: React.ReactNode;
    slot_1_1135?: React.ReactNode;
    slot_1_1136?: React.ReactNode;
    slot_1_1137?: React.ReactNode;
}
const Typedefaultstatefocussizebig = (
    props: TypedefaultstatefocussizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1134,
        slot_1_1135,
        slot_1_1136,
        slot_1_1137
    } = props;

    return (
        <div
            className={["component-1_1133", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1133"
                className="stroke-wrapper-1_1133 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1133 pixso-relative-flex">
                    {slot_1_1134 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1134"
                                className="Pixso-instance-1_1134 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1135 ?? (
                        <p
                            id="1_1135"
                            className="Pixso-paragraph-1_1135 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1136 ??
                        (visible_4958_42 && (
                            <Typedefaultsizebig
                                id="1_1136"
                                className="Pixso-instance-1_1136 pixso-relative-no-shrink"
                            ></Typedefaultsizebig>
                        ))}
                    {slot_1_1137 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1137"
                                className="Pixso-instance-1_1137 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1133"></div>
            </div>
        </div>
    );
};
export default Typedefaultstatefocussizebig;
