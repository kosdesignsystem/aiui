import "@/styles/CommunicationdataTransfer8.css";
interface CommunicationdataTransfer8Props {
    id?: string;
    className?: string;
}
const CommunicationdataTransfer8 = (props: CommunicationdataTransfer8Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9728", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9728"
                className="Pixso-symbol-3001_9728 pixso-position-relative"
            ></div>
        </div>
    );
};
export default CommunicationdataTransfer8;
