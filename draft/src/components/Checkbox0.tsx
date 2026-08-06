import { withStopPropagation } from "@/utils/utils";
import "@/styles/Checkbox0.css";
interface Checkbox0Props {
    visible_2553606693_2170505898?: boolean;
    visible_2979094079_409950470?: boolean;
    state?: string;
    disabled?: string;
    id?: string;
    className?: string;
    click?: (e: any) => void;
}
const Checkbox0 = (props: Checkbox0Props) => {
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
            className={["component-1057_170126", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
            onClick={withStopPropagation(click)}
        >
            <div id="1057_170126" className="Pixso-symbol-1057_170126">
                {state === "deselected" && disabled === "no" && (
                    <div
                        id="1057_170127"
                        className="Pixso-symbol-1057_170127"
                    ></div>
                )}
                {state === "deselected" && disabled === "yes" && (
                    <div
                        id="1057_170129"
                        className="Pixso-symbol-1057_170129"
                    ></div>
                )}
                {state === "selected" && disabled === "no" && (
                    <div
                        id="1057_170131"
                        className="Pixso-symbol-1057_170131"
                    ></div>
                )}
                {state === "mixed" && disabled === "no" && (
                    <div
                        id="1057_170134"
                        className="Pixso-symbol-1057_170134"
                    ></div>
                )}
                {state === "mixed" && disabled === "yes" && (
                    <div
                        id="1057_170137"
                        className="Pixso-symbol-1057_170137"
                    ></div>
                )}
                {state === "selected" && disabled === "yes" && (
                    <div
                        id="1057_170140"
                        className="Pixso-symbol-1057_170140"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Checkbox0;
