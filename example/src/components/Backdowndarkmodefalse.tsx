import Isoutlinetrue22 from "@/components/Isoutlinetrue22";
import Isoutlinetrue21 from "@/components/Isoutlinetrue21";
import "@/styles/Backdowndarkmodefalse.css";
interface BackdowndarkmodefalseProps {
    visible_17172_0?: boolean;
    id?: string;
    className?: string;
    slot_421_11162?: React.ReactNode;
    slot_421_11164?: React.ReactNode;
    slot_421_11165?: React.ReactNode;
    slot_421_11166?: React.ReactNode;
}
const Backdowndarkmodefalse = (props: BackdowndarkmodefalseProps) => {
    const {
        visible_17172_0 = true,
        id,
        className = "",
        slot_421_11162,
        slot_421_11164,
        slot_421_11165,
        slot_421_11166
    } = props;

    return (
        <div
            className={["component-421_11155", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_11155"
                className="Pixso-symbol-421_11155 pixso-position-relative"
            >
                <div id="421_11161" className="Pixso-frame-421_11161">
                    {slot_421_11162 ?? (
                        <Isoutlinetrue22
                            id="421_11162"
                            className="Pixso-instance-421_11162"
                        ></Isoutlinetrue22>
                    )}
                </div>
                {visible_17172_0 && (
                    <div id="421_11163" className="Pixso-frame-421_11163">
                        {slot_421_11164 ?? (
                            <Isoutlinetrue21
                                id="421_11164"
                                className="Pixso-instance-421_11164"
                            ></Isoutlinetrue21>
                        )}
                    </div>
                )}
                {slot_421_11165 ?? (
                    <div
                        id="421_11165"
                        className="Pixso-vector-421_11165"
                    ></div>
                )}
                {slot_421_11166 ?? (
                    <div
                        id="421_11166"
                        className="Pixso-vector-421_11166"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Backdowndarkmodefalse;
