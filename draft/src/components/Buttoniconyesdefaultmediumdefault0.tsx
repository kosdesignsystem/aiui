import Settings0 from "@/components/Settings0";
import "@/styles/Buttoniconyesdefaultmediumdefault0.css";
interface Buttoniconyesdefaultmediumdefault0Props {
    instance_5019_53?: string;
    id?: string;
    className?: string;
    slot_1057_169889?: React.ReactNode;
}
const Buttoniconyesdefaultmediumdefault0 = (
    props: Buttoniconyesdefaultmediumdefault0Props
) => {
    const {
        instance_5019_53 = "Component_188_119799",
        id,
        className = "",
        slot_1057_169889
    } = props;

    return (
        <div
            className={["component-1057_169888", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_169888" className="Pixso-symbol-1057_169888">
                {slot_1057_169889 ?? (
                    <Settings0
                        id="1057_169889"
                        className="Pixso-instance-1057_169889"
                        is_outline="false"
                    ></Settings0>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesdefaultmediumdefault0;
