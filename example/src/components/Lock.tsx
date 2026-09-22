import "@/styles/Lock.css";
interface LockProps {
    id?: string;
    className?: string;
    slot_3001_8039?: React.ReactNode;
    slot_3001_8040?: React.ReactNode;
    slot_3001_8041?: React.ReactNode;
    slot_3001_8043?: React.ReactNode;
    slot_3001_8044?: React.ReactNode;
    slot_3001_8050?: React.ReactNode;
    slot_3001_8051?: React.ReactNode;
    slot_3001_8052?: React.ReactNode;
    slot_3001_8053?: React.ReactNode;
    slot_3001_8054?: React.ReactNode;
}
const Lock = (props: LockProps) => {
    const {
        id,
        className = "",
        slot_3001_8039,
        slot_3001_8040,
        slot_3001_8041,
        slot_3001_8043,
        slot_3001_8044,
        slot_3001_8050,
        slot_3001_8051,
        slot_3001_8052,
        slot_3001_8053,
        slot_3001_8054
    } = props;

    return (
        <div
            className={["component-3001_8038", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8038"
                className="Pixso-symbol-3001_8038 pixso-position-relative"
            >
                {slot_3001_8039 ?? (
                    <div
                        id="3001_8039"
                        className="Pixso-vector-3001_8039"
                    ></div>
                )}
                {slot_3001_8040 ?? (
                    <div
                        id="3001_8040"
                        className="Pixso-vector-3001_8040"
                    ></div>
                )}
                {slot_3001_8041 ?? (
                    <div
                        id="3001_8041"
                        className="Pixso-vector-3001_8041"
                    ></div>
                )}
                <div id="3001_8042" className="Pixso-group-3001_8042">
                    {slot_3001_8043 ?? (
                        <div
                            id="3001_8043"
                            className="Pixso-vector-3001_8043"
                        ></div>
                    )}
                    {slot_3001_8044 ?? (
                        <div
                            id="3001_8044"
                            className="Pixso-vector-3001_8044"
                        ></div>
                    )}
                </div>
                <div id="3001_8049" className="Pixso-group-3001_8049">
                    {slot_3001_8050 ?? (
                        <div
                            id="3001_8050"
                            className="Pixso-vector-3001_8050"
                        ></div>
                    )}
                    {slot_3001_8051 ?? (
                        <div
                            id="3001_8051"
                            className="Pixso-vector-3001_8051"
                        ></div>
                    )}
                </div>
                {slot_3001_8052 ?? (
                    <div
                        id="3001_8052"
                        className="Pixso-vector-3001_8052"
                    ></div>
                )}
                {slot_3001_8053 ?? (
                    <div
                        id="3001_8053"
                        className="Pixso-vector-3001_8053"
                    ></div>
                )}
                {slot_3001_8054 ?? (
                    <div
                        id="3001_8054"
                        className="Pixso-vector-3001_8054"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Lock;
