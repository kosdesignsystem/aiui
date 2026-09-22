import "@/styles/Calculator.css";
interface CalculatorProps {
    id?: string;
    className?: string;
    slot_3001_8091?: React.ReactNode;
    slot_3001_8094?: React.ReactNode;
    slot_3001_8099?: React.ReactNode;
    slot_3001_8104?: React.ReactNode;
    slot_3001_8107?: React.ReactNode;
}
const Calculator = (props: CalculatorProps) => {
    const {
        id,
        className = "",
        slot_3001_8091,
        slot_3001_8094,
        slot_3001_8099,
        slot_3001_8104,
        slot_3001_8107
    } = props;

    return (
        <div
            className={["component-3001_8088", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_8088"
                className="Pixso-symbol-3001_8088 pixso-position-relative"
            >
                <div id="3001_8089" className="Pixso-group-3001_8089">
                    <div id="3001_8090" className="Pixso-group-3001_8090">
                        {slot_3001_8091 ?? (
                            <div
                                id="3001_8091"
                                className="Pixso-vector-3001_8091"
                            ></div>
                        )}
                    </div>
                    <div id="3001_8092" className="Pixso-group-3001_8092">
                        <div id="3001_8093" className="Pixso-group-3001_8093">
                            {slot_3001_8094 ?? (
                                <div
                                    id="3001_8094"
                                    className="vector-wrapper-3001_8094"
                                >
                                    <div
                                        id="3001_8094"
                                        className="Pixso-vector-3001_8094"
                                    ></div>
                                </div>
                            )}
                            <div
                                id="3001_8095"
                                className="Pixso-group-3001_8095"
                            >
                                <div
                                    id="3001_8096"
                                    className="Pixso-rectangle-3001_8096"
                                ></div>
                                <div
                                    id="3001_8097"
                                    className="Pixso-rectangle-3001_8097"
                                ></div>
                            </div>
                        </div>
                        <div id="3001_8098" className="Pixso-group-3001_8098">
                            {slot_3001_8099 ?? (
                                <div
                                    id="3001_8099"
                                    className="vector-wrapper-3001_8099"
                                >
                                    <div
                                        id="3001_8099"
                                        className="Pixso-vector-3001_8099"
                                    ></div>
                                </div>
                            )}
                            <div
                                id="3001_8100"
                                className="Pixso-group-3001_8100"
                            >
                                <div
                                    id="3001_8101"
                                    className="Pixso-rectangle-3001_8101"
                                ></div>
                                <div
                                    id="3001_8102"
                                    className="Pixso-rectangle-3001_8102"
                                ></div>
                            </div>
                        </div>
                        <div id="3001_8103" className="Pixso-group-3001_8103">
                            {slot_3001_8104 ?? (
                                <div
                                    id="3001_8104"
                                    className="vector-wrapper-3001_8104"
                                >
                                    <div
                                        id="3001_8104"
                                        className="Pixso-vector-3001_8104"
                                    ></div>
                                </div>
                            )}
                            <div
                                id="3001_8105"
                                className="Pixso-rectangle-3001_8105"
                            ></div>
                        </div>
                        <div id="3001_8106" className="Pixso-group-3001_8106">
                            {slot_3001_8107 ?? (
                                <div
                                    id="3001_8107"
                                    className="vector-wrapper-3001_8107"
                                >
                                    <div
                                        id="3001_8107"
                                        className="Pixso-vector-3001_8107"
                                    ></div>
                                </div>
                            )}
                            <div
                                id="3001_8108"
                                className="Pixso-group-3001_8108"
                            >
                                <div
                                    id="3001_8109"
                                    className="Pixso-rectangle-3001_8109"
                                ></div>
                                <div
                                    id="3001_8110"
                                    className="Pixso-rectangle-3001_8110"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Calculator;
