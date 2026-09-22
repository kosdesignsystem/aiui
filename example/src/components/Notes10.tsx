import "@/styles/Notes10.css";
interface Notes10Props {
    id?: string;
    className?: string;
}
const Notes10 = (props: Notes10Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10313", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10313"
                className="Pixso-symbol-1_10313 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Notes10;
