import SwitchLoader from "@/components/Switchloader";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Switch.css";
interface SwitchProps {
    visible_3917846554_4175930320?: boolean;
    type?: string;
    id?: string;
    className?: string;
    click?: (e: any) => void;
    slot_1057_169898?: React.ReactNode;
    slot_1057_169899?: React.ReactNode;
}
const Switch = (props: SwitchProps) => {
    const {
        visible_3917846554_4175930320 = true,
        type,
        id,
        className = "",
        click,
        slot_1057_169898,
        slot_1057_169899
    } = props;

    return (
        <div
            className={["component-1057_169894", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
            onClick={withStopPropagation(click)}
        >
            <div id="1057_169894" className="Pixso-symbol-1057_169894">
                {type === "default" && (
                    <div id="1057_169895" className="Pixso-symbol-1057_169895">
                        <div
                            id="1057_169896"
                            className="Pixso-rectangle-1057_169896"
                        ></div>
                    </div>
                )}
                {type === "loading" && (
                    <div id="1057_169897" className="Pixso-symbol-1057_169897">
                        {slot_1057_169898 ?? (
                            <div
                                id="1057_169898"
                                className="Pixso-vector-1057_169898"
                            ></div>
                        )}
                        {slot_1057_169899 ?? (
                            <SwitchLoader
                                id="1057_169899"
                                className="Pixso-instance-1057_169899"
                                Property1="Variant3"
                            ></SwitchLoader>
                        )}
                        <div
                            id="1057_169900"
                            className="Pixso-rectangle-1057_169900"
                        ></div>
                    </div>
                )}
                {type === "active" && (
                    <div id="1057_169901" className="Pixso-symbol-1057_169901">
                        <div
                            id="1057_169902"
                            className="Pixso-rectangle-1057_169902"
                        ></div>
                    </div>
                )}
                {type === "disabled-default" && (
                    <div id="1057_169903" className="Pixso-symbol-1057_169903">
                        <div
                            id="1057_169904"
                            className="Pixso-rectangle-1057_169904"
                        ></div>
                    </div>
                )}
                {type === "disabled-active" && (
                    <div id="1057_169905" className="Pixso-symbol-1057_169905">
                        <div
                            id="1057_169906"
                            className="Pixso-rectangle-1057_169906"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Switch;
