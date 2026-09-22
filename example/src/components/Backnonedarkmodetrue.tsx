import Isoutlinetrue21 from "@/components/Isoutlinetrue21";
import "@/styles/Backnonedarkmodetrue.css";
interface BacknonedarkmodetrueProps {
    visible_17172_0?: boolean;
    id?: string;
    className?: string;
    slot_421_11190?: React.ReactNode;
    slot_421_11191?: React.ReactNode;
    slot_421_11192?: React.ReactNode;
}
const Backnonedarkmodetrue = (props: BacknonedarkmodetrueProps) => {
    const {
        visible_17172_0 = true,
        id,
        className = "",
        slot_421_11190,
        slot_421_11191,
        slot_421_11192
    } = props;

    return (
        <div
            className={["component-421_11160", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_11160"
                className="Pixso-symbol-421_11160 pixso-position-relative"
            >
                {visible_17172_0 && (
                    <div id="421_11189" className="Pixso-frame-421_11189">
                        {slot_421_11190 ?? (
                            <Isoutlinetrue21
                                id="421_11190"
                                className="Pixso-instance-421_11190"
                            ></Isoutlinetrue21>
                        )}
                    </div>
                )}
                {slot_421_11191 ?? (
                    <div
                        id="421_11191"
                        className="Pixso-vector-421_11191"
                    ></div>
                )}
                {slot_421_11192 ?? (
                    <div
                        id="421_11192"
                        className="Pixso-vector-421_11192"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Backnonedarkmodetrue;
