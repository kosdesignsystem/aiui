import Isoutlinetrue22 from "@/components/Isoutlinetrue22";
import Isoutlinetrue21 from "@/components/Isoutlinetrue21";
import "@/styles/Backdowndarkmodetrue.css";
interface BackdowndarkmodetrueProps {
    visible_17172_0?: boolean;
    id?: string;
    className?: string;
    slot_421_11178?: React.ReactNode;
    slot_421_11180?: React.ReactNode;
    slot_421_11181?: React.ReactNode;
    slot_421_11182?: React.ReactNode;
}
const Backdowndarkmodetrue = (props: BackdowndarkmodetrueProps) => {
    const {
        visible_17172_0 = true,
        id,
        className = "",
        slot_421_11178,
        slot_421_11180,
        slot_421_11181,
        slot_421_11182
    } = props;

    return (
        <div
            className={["component-421_11158", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_11158"
                className="Pixso-symbol-421_11158 pixso-position-relative"
            >
                <div id="421_11177" className="Pixso-frame-421_11177">
                    {slot_421_11178 ?? (
                        <Isoutlinetrue22
                            id="421_11178"
                            className="Pixso-instance-421_11178"
                        ></Isoutlinetrue22>
                    )}
                </div>
                {visible_17172_0 && (
                    <div id="421_11179" className="Pixso-frame-421_11179">
                        {slot_421_11180 ?? (
                            <Isoutlinetrue21
                                id="421_11180"
                                className="Pixso-instance-421_11180"
                            ></Isoutlinetrue21>
                        )}
                    </div>
                )}
                {slot_421_11181 ?? (
                    <div
                        id="421_11181"
                        className="Pixso-vector-421_11181"
                    ></div>
                )}
                {slot_421_11182 ?? (
                    <div
                        id="421_11182"
                        className="Pixso-vector-421_11182"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Backdowndarkmodetrue;
