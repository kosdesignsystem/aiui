import "@/styles/DarkModeyesthemebluetypedefaultsizebig.css";
interface DarkModeyesthemebluetypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26889?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultsizebig = (
    props: DarkModeyesthemebluetypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26889 } = props;

    return (
        <div
            className={["component-1_26887", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26887"
                className="Pixso-symbol-1_26887 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                <div
                    id="1_26888"
                    className="Pixso-rectangle-1_26888 fill-dark_contentplashka-1_30095"
                ></div>
                {slot_1_26889 ?? (
                    <p
                        id="1_26889"
                        className="Pixso-paragraph-1_26889 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultsizebig;
