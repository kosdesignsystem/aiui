import "@/styles/DarkModenothemepurpletypegreensizebig.css";
interface DarkModenothemepurpletypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26878?: React.ReactNode;
}
const DarkModenothemepurpletypegreensizebig = (
    props: DarkModenothemepurpletypegreensizebigProps
) => {
    const { id, className = "", slot_1_26878 } = props;

    return (
        <div
            className={["component-1_26877", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26877"
                className="Pixso-symbol-1_26877 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26878 ?? (
                    <p
                        id="1_26878"
                        className="Pixso-paragraph-1_26878 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypegreensizebig;
