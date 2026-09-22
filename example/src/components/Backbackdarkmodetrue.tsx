import Isoutlinetrue20 from "@/components/Isoutlinetrue20";
import Isoutlinetrue21 from "@/components/Isoutlinetrue21";
import "@/styles/Backbackdarkmodetrue.css";
interface BackbackdarkmodetrueProps {
    visible_17172_0?: boolean;
    id?: string;
    className?: string;
    slot_421_11184?: React.ReactNode;
    slot_421_11186?: React.ReactNode;
    slot_421_11187?: React.ReactNode;
    slot_421_11188?: React.ReactNode;
}
const Backbackdarkmodetrue = (props: BackbackdarkmodetrueProps) => {
    const {
        visible_17172_0 = true,
        id,
        className = "",
        slot_421_11184,
        slot_421_11186,
        slot_421_11187,
        slot_421_11188
    } = props;

    return (
        <div
            className={["component-421_11159", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_11159"
                className="Pixso-symbol-421_11159 pixso-position-relative"
            >
                <div id="421_11183" className="Pixso-frame-421_11183">
                    {slot_421_11184 ?? (
                        <Isoutlinetrue20
                            id="421_11184"
                            className="Pixso-instance-421_11184"
                        ></Isoutlinetrue20>
                    )}
                </div>
                {visible_17172_0 && (
                    <div id="421_11185" className="Pixso-frame-421_11185">
                        {slot_421_11186 ?? (
                            <Isoutlinetrue21
                                id="421_11186"
                                className="Pixso-instance-421_11186"
                            ></Isoutlinetrue21>
                        )}
                    </div>
                )}
                {slot_421_11187 ?? (
                    <div
                        id="421_11187"
                        className="Pixso-vector-421_11187"
                    ></div>
                )}
                {slot_421_11188 ?? (
                    <div
                        id="421_11188"
                        className="Pixso-vector-421_11188"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Backbackdarkmodetrue;
