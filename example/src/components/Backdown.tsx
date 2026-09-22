import "@/styles/Backdown.css";
interface BackdownProps {
    visible_17333_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6341?: React.ReactNode;
    slot_3078_6343?: React.ReactNode;
}
const Backdown = (props: BackdownProps) => {
    const {
        visible_17333_0 = true,
        id,
        className = "",
        slot_3078_6341,
        slot_3078_6343
    } = props;

    return (
        <div
            className={["component-3078_6339", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6339"
                className="Pixso-symbol-3078_6339 pixso-position-relative"
            >
                {visible_17333_0 && (
                    <div id="3078_6340" className="Pixso-frame-3078_6340">
                        {slot_3078_6341 ?? (
                            <div
                                id="3078_6341"
                                className="Pixso-vector-3078_6341"
                            ></div>
                        )}
                    </div>
                )}
                <div id="3078_6342" className="Pixso-frame-3078_6342">
                    {slot_3078_6343 ?? (
                        <div
                            id="3078_6343"
                            className="Pixso-vector-3078_6343"
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Backdown;
