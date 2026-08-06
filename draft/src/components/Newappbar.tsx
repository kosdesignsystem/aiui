import Dialpad1 from "@/components/Dialpad1";
import "@/styles/Newappbar.css";
interface NewappbarProps {
    id?: string;
    className?: string;
    slot_445_139136?: React.ReactNode;
    slot_445_139137?: React.ReactNode;
    slot_445_139139?: React.ReactNode;
    slot_445_139140?: React.ReactNode;
    slot_445_139142?: React.ReactNode;
    slot_445_139143?: React.ReactNode;
}
const Newappbar = (props: NewappbarProps) => {
    const {
        id,
        className = "",
        slot_445_139136,
        slot_445_139137,
        slot_445_139139,
        slot_445_139140,
        slot_445_139142,
        slot_445_139143
    } = props;

    return (
        <div
            className={["component-445_139134", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="445_139134" className="Pixso-symbol-445_139134">
                <div id="445_139135" className="Pixso-frame-445_139135">
                    <div className="frame-content-445_139135">
                        {slot_445_139136 ?? (
                            <div
                                id="445_139136"
                                className="Pixso-instance-445_139136"
                                is_outline="false"
                            ></div>
                        )}
                        {slot_445_139137 ?? (
                            <p
                                id="445_139137"
                                className="Pixso-paragraph-445_139137"
                            >
                                {"Вызовы"}
                            </p>
                        )}
                    </div>
                </div>
                <div id="445_139138" className="Pixso-frame-445_139138">
                    <div className="frame-content-445_139138">
                        {slot_445_139139 ?? (
                            <div
                                id="445_139139"
                                className="Pixso-instance-445_139139"
                                is_outline="true"
                            ></div>
                        )}
                        {slot_445_139140 ?? (
                            <p
                                id="445_139140"
                                className="Pixso-paragraph-445_139140"
                            >
                                {"Контакты"}
                            </p>
                        )}
                    </div>
                </div>
                <div id="445_139141" className="Pixso-frame-445_139141">
                    <div className="frame-content-445_139141">
                        {slot_445_139142 ?? (
                            <Dialpad1
                                id="445_139142"
                                className="Pixso-instance-445_139142"
                            ></Dialpad1>
                        )}
                        {slot_445_139143 ?? (
                            <p
                                id="445_139143"
                                className="Pixso-paragraph-445_139143"
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
