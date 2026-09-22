import "@/styles/DarkModenothemebluetypeaccentsizebig.css";
interface DarkModenothemebluetypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26826?: React.ReactNode;
}
const DarkModenothemebluetypeaccentsizebig = (
    props: DarkModenothemebluetypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26826 } = props;

    return (
        <div
            className={["component-1_26825", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26825"
                className="Pixso-symbol-1_26825 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_26826 ?? (
                    <p
                        id="1_26826"
                        className="Pixso-paragraph-1_26826 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeaccentsizebig;
