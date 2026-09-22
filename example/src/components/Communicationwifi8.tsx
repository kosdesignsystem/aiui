import "@/styles/Communicationwifi8.css";
interface Communicationwifi8Props {
    id?: string;
    className?: string;
}
const Communicationwifi8 = (props: Communicationwifi8Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_7935", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_7935"
                className="Pixso-symbol-3001_7935 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Communicationwifi8;
