import SwitchLoader0 from "@/components/Switchloader0";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Switch0.css";
interface Switch0Props {
    visible_3917846554_4175930320?: boolean;
    type?: string;
    id?: string;
    className?: string;
    click?: (e: any) => void;
    slot_894_155599?: React.ReactNode;
    slot_894_155600?: React.ReactNode;
}
const Switch0 = (props: Switch0Props) => {
    const {
        visible_3917846554_4175930320 = true,
        type,
        id,
        className = "",
        click,
        slot_894_155599,
        slot_894_155600
    } = props;

    return (
        <div
            className={["component-894_155595", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
            onClick={withStopPropagation(click)}
        >
            <div id="894_155595" className="Pixso-symbol-894_155595">
                {type === "default" && (
                    <div id="894_155596" className="Pixso-symbol-894_155596">
                        <div
                            id="894_155597"
                            className="Pixso-rectangle-894_155597"
                        ></div>
                    </div>
                )}
                {type === "loading" && (
                    <div id="894_155598" className="Pixso-symbol-894_155598">
                        {slot_894_155599 ?? (
                            <div
                                id="894_155599"
                                className="Pixso-vector-894_155599"
                            ></div>
                        )}
                        {slot_894_155600 ?? (
                            <SwitchLoader0
                                id="894_155600"
                                className="Pixso-instance-894_155600"
                                Property1="Variant3"
                            ></SwitchLoader0>
                        )}
                        <div
                            id="894_155601"
                            className="Pixso-rectangle-894_155601"
                        ></div>
                    </div>
                )}
                {type === "active" && (
                    <div id="894_155602" className="Pixso-symbol-894_155602">
                        <div
                            id="894_155603"
                            className="Pixso-rectangle-894_155603"
                        ></div>
                    </div>
                )}
                {type === "disabled-default" && (
                    <div id="894_155604" className="Pixso-symbol-894_155604">
                        <div
                            id="894_155605"
                            className="Pixso-rectangle-894_155605"
                        ></div>
                    </div>
                )}
                {type === "disabled-active" && (
                    <div id="894_155606" className="Pixso-symbol-894_155606">
                        <div
                            id="894_155607"
                            className="Pixso-rectangle-894_155607"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Switch0;
