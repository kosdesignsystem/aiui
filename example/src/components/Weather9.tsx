import "@/styles/Weather9.css";
interface Weather9Props {
    id?: string;
    className?: string;
}
const Weather9 = (props: Weather9Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10221", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10221"
                className="Pixso-symbol-1_10221 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Weather9;
