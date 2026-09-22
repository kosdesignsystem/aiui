import "@/styles/Search0.css";
interface Search0Props {
    id?: string;
    className?: string;
}
const Search0 = (props: Search0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9851", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9851"
                className="Pixso-symbol-421_9851 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Search0;
