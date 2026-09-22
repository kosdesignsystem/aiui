import Isoutlinefalse31 from "@/components/Isoutlinefalse31";
import Isoutlinefalse30 from "@/components/Isoutlinefalse30";
import Isoutlinefalse29 from "@/components/Isoutlinefalse29";
import "@/styles/Count3darkModefalse.css";
interface Count3darkModefalseProps {
    id?: string;
    className?: string;
    slot_421_9792?: React.ReactNode;
    slot_421_9793?: React.ReactNode;
    slot_421_9794?: React.ReactNode;
}
const Count3darkModefalse = (props: Count3darkModefalseProps) => {
    const {
        id,
        className = "",
        slot_421_9792,
        slot_421_9793,
        slot_421_9794
    } = props;

    return (
        <div
            className={["component-421_9791", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9791"
                className="Pixso-symbol-421_9791 pixso-relative-flex"
            >
                {slot_421_9792 ?? (
                    <Isoutlinefalse31
                        id="421_9792"
                        className="Pixso-instance-421_9792 pixso-relative-no-shrink"
                    ></Isoutlinefalse31>
                )}
                {slot_421_9793 ?? (
                    <Isoutlinefalse30
                        id="421_9793"
                        className="Pixso-instance-421_9793 pixso-relative-no-shrink"
                    ></Isoutlinefalse30>
                )}
                {slot_421_9794 ?? (
                    <Isoutlinefalse29
                        id="421_9794"
                        className="Pixso-instance-421_9794 pixso-relative-no-shrink"
                    ></Isoutlinefalse29>
                )}
            </div>
        </div>
    );
};
export default Count3darkModefalse;
