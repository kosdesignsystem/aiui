import "@/styles/Mail11.css";
interface Mail11Props {
    id?: string;
    className?: string;
}
const Mail11 = (props: Mail11Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10303", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10303"
                className="Pixso-symbol-1_10303 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Mail11;
