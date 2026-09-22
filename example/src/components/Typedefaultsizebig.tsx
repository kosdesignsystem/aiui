import "@/styles/Typedefaultsizebig.css";
interface TypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_831?: React.ReactNode;
}
const Typedefaultsizebig = (props: TypedefaultsizebigProps) => {
    const { id, className = "", slot_1_831 } = props;

    return (
        <div
            className={["component-1_830", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_830" className="Pixso-symbol-1_830 pixso-relative-flex">
                {slot_1_831 ?? (
                    <p
                        id="1_831"
                        className="Pixso-paragraph-1_831 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typedefaultsizebig;
