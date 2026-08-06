import "@/styles/Settings.css";
interface SettingsProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Settings = (props: SettingsProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-504_2218", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="504_2218" className="Pixso-symbol-504_2218">
                {is_outline === "false" && (
                    <div id="504_2219" className="Pixso-symbol-504_2219"></div>
                )}
                {is_outline === "true" && (
                    <div id="504_2221" className="Pixso-symbol-504_2221"></div>
                )}
            </div>
        </div>
    );
};
export default Settings;
