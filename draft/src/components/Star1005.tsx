import "@/styles/Star1005.css";
interface Star1005Props {
    id?: string;
    className?: string;
}
const Star1005 = (props: Star1005Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-431_165253", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165253" className="Pixso-symbol-431_165253"></div>
        </div>
    );
};
export default Star1005;
