import Settings0 from "@/components/Settings0";
import "@/styles/Buttoniconyesbluedefaultmediumdefault0.css";
interface Buttoniconyesbluedefaultmediumdefault0Props {
    instance_5019_49?: string;
    id?: string;
    className?: string;
    slot_1057_169891?: React.ReactNode;
}
const Buttoniconyesbluedefaultmediumdefault0 = (
    props: Buttoniconyesbluedefaultmediumdefault0Props
) => {
    const {
        instance_5019_49 = "Component_188_119799",
        id,
        className = "",
        slot_1057_169891
    } = props;

    return (
        <div
            className={["component-1057_169890", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_169890" className="Pixso-symbol-1057_169890">
                {slot_1057_169891 ?? (
                    <Settings0
                        id="1057_169891"
                        className="Pixso-instance-1057_169891"
                        is_outline="false"
                    ></Settings0>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesbluedefaultmediumdefault0;
