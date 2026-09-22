import "@/styles/IsOutlinetrue24.css";
interface IsOutlinetrue24Props {
    id?: string;
    className?: string;
}
const IsOutlinetrue24 = (props: IsOutlinetrue24Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9739", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9739"
                className="Pixso-symbol-3001_9739 pixso-position-relative"
            ></div>
        </div>
    );
};
export default IsOutlinetrue24;
