import "@/styles/Communicationavia0.css";
interface Communicationavia0Props {
    id?: string;
    className?: string;
}
const Communicationavia0 = (props: Communicationavia0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9730", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9730"
                className="Pixso-symbol-3001_9730 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Communicationavia0;
