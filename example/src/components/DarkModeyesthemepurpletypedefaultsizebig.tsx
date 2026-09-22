import "@/styles/DarkModeyesthemepurpletypedefaultsizebig.css";
interface DarkModeyesthemepurpletypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26899?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultsizebig = (
    props: DarkModeyesthemepurpletypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26899 } = props;

    return (
        <div
            className={["component-1_26897", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26897"
                className="Pixso-symbol-1_26897 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                <div
                    id="1_26898"
                    className="Pixso-rectangle-1_26898 fill-dark_contentplashka-1_30095"
                ></div>
                {slot_1_26899 ?? (
                    <p
                        id="1_26899"
                        className="Pixso-paragraph-1_26899 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultsizebig;
