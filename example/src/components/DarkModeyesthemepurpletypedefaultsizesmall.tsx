import "@/styles/DarkModeyesthemepurpletypedefaultsizesmall.css";
interface DarkModeyesthemepurpletypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26985?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultsizesmall = (
    props: DarkModeyesthemepurpletypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26985 } = props;

    return (
        <div
            className={["component-1_26984", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26984"
                className="Pixso-symbol-1_26984 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                {slot_1_26985 ?? (
                    <p
                        id="1_26985"
                        className="Pixso-paragraph-1_26985 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
                <div
                    id="1_26986"
                    className="Pixso-rectangle-1_26986 fill-dark_contentplashka-1_30095"
                ></div>
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultsizesmall;
