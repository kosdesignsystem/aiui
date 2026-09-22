import "@/styles/Signal5058.css";
interface Signal5058Props {
    id?: string;
    className?: string;
}
const Signal5058 = (props: Signal5058Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9800", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9800"
                className="Pixso-symbol-421_9800 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Signal5058;
