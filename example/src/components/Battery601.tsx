import "@/styles/Battery601.css";
interface Battery601Props {
    id?: string;
    className?: string;
}
const Battery601 = (props: Battery601Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9821", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9821"
                className="Pixso-symbol-421_9821 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Battery601;
