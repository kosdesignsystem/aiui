import Deletedphoto from "@/components/Deletedphoto";
import Close2 from "@/components/Close2";
import "@/styles/Remainingdays.css";
interface RemainingdaysProps {
    visible_3042298610_1086140708?: boolean;
    Property1?: string;
    id?: string;
    className?: string;
    slot_431_165324?: React.ReactNode;
    slot_431_165325?: React.ReactNode;
    slot_431_165326?: React.ReactNode;
    slot_431_165329?: React.ReactNode;
    slot_431_165330?: React.ReactNode;
    slot_431_165331?: React.ReactNode;
}
const Remainingdays = (props: RemainingdaysProps) => {
    const {
        visible_3042298610_1086140708 = true,
        Property1,
        id,
        className = "",
        slot_431_165324,
        slot_431_165325,
        slot_431_165326,
        slot_431_165329,
        slot_431_165330,
        slot_431_165331
    } = props;

    return (
        <div
            className={["component-431_165321", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165321" className="Pixso-symbol-431_165321">
                {Property1 === "29-6" && (
                    <div id="431_165322" className="Pixso-symbol-431_165322">
                        <div id="431_165323" className="Pixso-frame-431_165323">
                            {slot_431_165324 ?? (
                                <Deletedphoto
                                    id="431_165324"
                                    className="Pixso-instance-431_165324"
                                    remainingdays="20-29"
                                ></Deletedphoto>
                            )}
                            {slot_431_165325 ?? (
                                <p
                                    id="431_165325"
                                    className="Pixso-paragraph-431_165325 text-medium12-431_165065"
                                >
                                    {"25"}
                                </p>
                            )}
                            {slot_431_165326 ?? (
                                <Close2
                                    id="431_165326"
                                    className="Pixso-instance-431_165326"
                                ></Close2>
                            )}
                        </div>
                    </div>
                )}
                {Property1 === "5-1" && (
                    <div id="431_165327" className="Pixso-symbol-431_165327">
                        <div id="431_165328" className="Pixso-frame-431_165328">
                            {slot_431_165329 ?? (
                                <Deletedphoto
                                    id="431_165329"
                                    className="Pixso-instance-431_165329"
                                    remainingdays="1-5"
                                ></Deletedphoto>
                            )}
                            {slot_431_165330 ?? (
                                <p
                                    id="431_165330"
                                    className="Pixso-paragraph-431_165330 text-medium12-431_165065"
                                >
                                    {"25"}
                                </p>
                            )}
                            {slot_431_165331 ?? (
                                <Close2
                                    id="431_165331"
                                    className="Pixso-instance-431_165331"
                                ></Close2>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Remainingdays;
