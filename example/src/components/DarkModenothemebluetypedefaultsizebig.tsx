import "@/styles/DarkModenothemebluetypedefaultsizebig.css";
interface DarkModenothemebluetypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26886?: React.ReactNode;
}
const DarkModenothemebluetypedefaultsizebig = (
    props: DarkModenothemebluetypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26886 } = props;

    return (
        <div
            className={["component-1_26885", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26885"
                className="Pixso-symbol-1_26885 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26886 ?? (
                    <p
                        id="1_26886"
                        className="Pixso-paragraph-1_26886 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultsizebig;
