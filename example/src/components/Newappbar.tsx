import Isoutlinefalse33 from "@/components/Isoutlinefalse33";
import Isoutlinetrue32 from "@/components/Isoutlinetrue32";
import Dialpad4 from "@/components/Dialpad4";
import "@/styles/Newappbar.css";
interface NewappbarProps {
    id?: string;
    className?: string;
    slot_3078_6327?: React.ReactNode;
    slot_3078_6328?: React.ReactNode;
    slot_3078_6330?: React.ReactNode;
    slot_3078_6331?: React.ReactNode;
    slot_3078_6333?: React.ReactNode;
    slot_3078_6334?: React.ReactNode;
}
const Newappbar = (props: NewappbarProps) => {
    const {
        id,
        className = "",
        slot_3078_6327,
        slot_3078_6328,
        slot_3078_6330,
        slot_3078_6331,
        slot_3078_6333,
        slot_3078_6334
    } = props;

    return (
        <div
            className={["component-3078_6325", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6325"
                className="Pixso-symbol-3078_6325 pixso-relative-flex"
            >
                <div
                    id="3078_6326"
                    className="Pixso-frame-3078_6326 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6326 pixso-relative-flex">
                        {slot_3078_6327 ?? (
                            <Isoutlinefalse33
                                id="3078_6327"
                                className="Pixso-instance-3078_6327 pixso-relative-no-shrink"
                            ></Isoutlinefalse33>
                        )}
                        {slot_3078_6328 ?? (
                            <p
                                id="3078_6328"
                                className="Pixso-paragraph-3078_6328 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                            >
                                {"Вызовы"}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    id="3078_6329"
                    className="Pixso-frame-3078_6329 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6329 pixso-relative-flex">
                        {slot_3078_6330 ?? (
                            <Isoutlinetrue32
                                id="3078_6330"
                                className="Pixso-instance-3078_6330 pixso-relative-no-shrink"
                            ></Isoutlinetrue32>
                        )}
                        {slot_3078_6331 ?? (
                            <p
                                id="3078_6331"
                                className="Pixso-paragraph-3078_6331 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                            >
                                {"Контакты"}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    id="3078_6332"
                    className="Pixso-frame-3078_6332 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6332 pixso-relative-flex">
                        {slot_3078_6333 ?? (
                            <Dialpad4
                                id="3078_6333"
                                className="Pixso-instance-3078_6333 pixso-relative-no-shrink"
                            ></Dialpad4>
                        )}
                        {slot_3078_6334 ?? (
                            <p
                                id="3078_6334"
                                className="Pixso-paragraph-3078_6334 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                            >
                                {"Набор"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Newappbar;
