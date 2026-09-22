import "@/styles/Battery1001.css";
interface Battery1001Props {
    id?: string;
    className?: string;
}
const Battery1001 = (props: Battery1001Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9824", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9824"
                className="Pixso-symbol-421_9824 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Battery1001;
