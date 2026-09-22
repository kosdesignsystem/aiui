import "@/styles/Wifil5062.css";
interface Wifil5062Props {
    id?: string;
    className?: string;
}
const Wifil5062 = (props: Wifil5062Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9803", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9803"
                className="Pixso-symbol-421_9803 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Wifil5062;
