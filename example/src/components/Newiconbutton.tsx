import Isoutlinefalse28 from "@/components/Isoutlinefalse28";
import "@/styles/Newiconbutton.css";
interface NewiconbuttonProps {
    id?: string;
    className?: string;
    slot_3078_6240?: React.ReactNode;
}
const Newiconbutton = (props: NewiconbuttonProps) => {
    const { id, className = "", slot_3078_6240 } = props;

    return (
        <div
            className={["component-3078_6239", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6239"
                className="Pixso-symbol-3078_6239 pixso-relative-flex"
            >
                {slot_3078_6240 ?? (
                    <Isoutlinefalse28
                        id="3078_6240"
                        className="Pixso-instance-3078_6240 pixso-relative-no-shrink"
                    ></Isoutlinefalse28>
                )}
            </div>
        </div>
    );
};
export default Newiconbutton;
