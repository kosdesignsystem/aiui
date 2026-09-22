import "@/styles/DarkModenothemebluetypeonAccentsizebig.css";
interface DarkModenothemebluetypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26838?: React.ReactNode;
}
const DarkModenothemebluetypeonAccentsizebig = (
    props: DarkModenothemebluetypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26838 } = props;

    return (
        <div
            className={["component-1_26837", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26837"
                className="Pixso-symbol-1_26837 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26838 ?? (
                    <p
                        id="1_26838"
                        className="Pixso-paragraph-1_26838 fill-blueprimary-1_10439-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeonAccentsizebig;
