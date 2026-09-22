import "@/styles/DarkModenothemebluetypegreensizebig.css";
interface DarkModenothemebluetypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26862?: React.ReactNode;
}
const DarkModenothemebluetypegreensizebig = (
    props: DarkModenothemebluetypegreensizebigProps
) => {
    const { id, className = "", slot_1_26862 } = props;

    return (
        <div
            className={["component-1_26861", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26861"
                className="Pixso-symbol-1_26861 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26862 ?? (
                    <p
                        id="1_26862"
                        className="Pixso-paragraph-1_26862 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypegreensizebig;
