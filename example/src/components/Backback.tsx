import "@/styles/Backback.css";
interface BackbackProps {
    visible_17333_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6346?: React.ReactNode;
    slot_3078_6348?: React.ReactNode;
}
const Backback = (props: BackbackProps) => {
    const {
        visible_17333_0 = true,
        id,
        className = "",
        slot_3078_6346,
        slot_3078_6348
    } = props;

    return (
        <div
            className={["component-3078_6344", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6344"
                className="Pixso-symbol-3078_6344 pixso-position-relative"
            >
                {visible_17333_0 && (
                    <div id="3078_6345" className="Pixso-frame-3078_6345">
                        {slot_3078_6346 ?? (
                            <div
                                id="3078_6346"
                                className="Pixso-vector-3078_6346"
                            ></div>
                        )}
                    </div>
                )}
                <div id="3078_6347" className="Pixso-frame-3078_6347">
                    {slot_3078_6348 ?? (
                        <div
                            id="3078_6348"
                            className="Pixso-vector-3078_6348"
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Backback;
