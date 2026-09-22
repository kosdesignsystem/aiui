import "@/styles/Battery101.css";
interface Battery101Props {
    id?: string;
    className?: string;
}
const Battery101 = (props: Battery101Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9817", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9817"
                className="Pixso-symbol-421_9817 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Battery101;
