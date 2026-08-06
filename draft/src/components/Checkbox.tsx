import { withStopPropagation } from "@/utils/utils";
import "@/styles/Checkbox.css";
interface CheckboxProps {
    visible_2553606693_2170505898?: boolean;
    visible_2979094079_409950470?: boolean;
    state?: string;
    disabled?: string;
    id?: string;
    className?: string;
    click?: (e: any) => void;
}
const Checkbox = (props: CheckboxProps) => {
    const {
        visible_2553606693_2170505898 = true,
        visible_2979094079_409950470 = true,
        state,
        disabled,
        id,
        className = "",
        click
    } = props;

    return (
        <div
            className={["component-431_163985", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
            onClick={withStopPropagation(click)}
        >
            <div id="431_163985" className="Pixso-symbol-431_163985">
                {state === "deselected" && disabled === "no" && (
                    <div
                        id="431_163986"
                        className="Pixso-symbol-431_163986"
                    ></div>
                )}
                {state === "deselected" && disabled === "yes" && (
                    <div
                        id="431_163988"
                        className="Pixso-symbol-431_163988"
                    ></div>
                )}
                {state === "selected" && disabled === "no" && (
                    <div
                        id="431_163990"
                        className="Pixso-symbol-431_163990"
                    ></div>
                )}
                {state === "mixed" && disabled === "no" && (
                    <div
                        id="431_163993"
                        className="Pixso-symbol-431_163993"
                    ></div>
                )}
                {state === "mixed" && disabled === "yes" && (
                    <div
                        id="431_163996"
                        className="Pixso-symbol-431_163996"
                    ></div>
                )}
                {state === "selected" && disabled === "yes" && (
                    <div
                        id="431_163999"
                        className="Pixso-symbol-431_163999"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Checkbox;
