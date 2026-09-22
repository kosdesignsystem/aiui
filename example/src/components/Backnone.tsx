import "@/styles/Backnone.css";
interface BacknoneProps {
    visible_17333_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6338?: React.ReactNode;
}
const Backnone = (props: BacknoneProps) => {
    const {
        visible_17333_0 = true,
        id,
        className = "",
        slot_3078_6338
    } = props;

    return (
        <div
            className={["component-3078_6336", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6336"
                className="Pixso-symbol-3078_6336 pixso-position-relative"
            >
                {visible_17333_0 && (
                    <div id="3078_6337" className="Pixso-frame-3078_6337">
                        {slot_3078_6338 ?? (
                            <div
                                id="3078_6338"
                                className="Pixso-vector-3078_6338"
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Backnone;
