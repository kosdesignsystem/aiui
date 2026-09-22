import "@/styles/Messenger.css";
interface MessengerProps {
    id?: string;
    className?: string;
    slot_3001_8113?: React.ReactNode;
    slot_3001_8115?: React.ReactNode;
    slot_3001_8116?: React.ReactNode;
    slot_3001_8117?: React.ReactNode;
    slot_3001_8118?: React.ReactNode;
    slot_3001_8119?: React.ReactNode;
}
const Messenger = (props: MessengerProps) => {
    const {
        id,
        className = "",
        slot_3001_8113,
        slot_3001_8115,
        slot_3001_8116,
        slot_3001_8117,
        slot_3001_8118,
        slot_3001_8119
    } = props;

    return (
        <div
            className={["component-3001_8111", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8111"
                className="Pixso-symbol-3001_8111 pixso-position-relative"
            >
                <div id="3001_8112" className="Pixso-group-3001_8112">
                    {slot_3001_8113 ?? (
                        <div
                            id="3001_8113"
                            className="Pixso-vector-3001_8113"
                        ></div>
                    )}
                    <div id="3001_8114" className="Pixso-group-3001_8114">
                        {slot_3001_8115 ?? (
                            <div
                                id="3001_8115"
                                className="Pixso-vector-3001_8115"
                            ></div>
                        )}
                        {slot_3001_8116 ?? (
                            <div
                                id="3001_8116"
                                className="Pixso-vector-3001_8116"
                            ></div>
                        )}
                        {slot_3001_8117 ?? (
                            <div
                                id="3001_8117"
                                className="Pixso-vector-3001_8117"
                            ></div>
                        )}
                        {slot_3001_8118 ?? (
                            <div
                                id="3001_8118"
                                className="Pixso-vector-3001_8118"
                            ></div>
                        )}
                        {slot_3001_8119 ?? (
                            <div
                                id="3001_8119"
                                className="Pixso-vector-3001_8119"
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Messenger;
