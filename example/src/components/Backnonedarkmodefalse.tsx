import Isoutlinetrue21 from "@/components/Isoutlinetrue21";
import "@/styles/Backnonedarkmodefalse.css";
interface BacknonedarkmodefalseProps {
    visible_17172_0?: boolean;
    id?: string;
    className?: string;
    slot_421_11174?: React.ReactNode;
    slot_421_11175?: React.ReactNode;
    slot_421_11176?: React.ReactNode;
}
const Backnonedarkmodefalse = (props: BacknonedarkmodefalseProps) => {
    const {
        visible_17172_0 = true,
        id,
        className = "",
        slot_421_11174,
        slot_421_11175,
        slot_421_11176
    } = props;

    return (
        <div
            className={["component-421_11157", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_11157"
                className="Pixso-symbol-421_11157 pixso-position-relative"
            >
                {visible_17172_0 && (
                    <div id="421_11173" className="Pixso-frame-421_11173">
                        {slot_421_11174 ?? (
                            <Isoutlinetrue21
                                id="421_11174"
                                className="Pixso-instance-421_11174"
                            ></Isoutlinetrue21>
                        )}
                    </div>
                )}
                {slot_421_11175 ?? (
                    <div
                        id="421_11175"
                        className="Pixso-vector-421_11175"
                    ></div>
                )}
                {slot_421_11176 ?? (
                    <div
                        id="421_11176"
                        className="Pixso-vector-421_11176"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Backnonedarkmodefalse;
