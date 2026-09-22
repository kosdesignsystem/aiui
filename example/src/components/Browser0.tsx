import "@/styles/Browser0.css";
interface Browser0Props {
    id?: string;
    className?: string;
}
const Browser0 = (props: Browser0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10339", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10339"
                className="Pixso-symbol-1_10339 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Browser0;
