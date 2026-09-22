import "@/styles/DarkModeyesthemegreentypedefaultsizesmall.css";
interface DarkModeyesthemegreentypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26980?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultsizesmall = (
    props: DarkModeyesthemegreentypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26980 } = props;

    return (
        <div
            className={["component-1_26979", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26979"
                className="Pixso-symbol-1_26979 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                {slot_1_26980 ?? (
                    <p
                        id="1_26980"
                        className="Pixso-paragraph-1_26980 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
                <div
                    id="1_26981"
                    className="Pixso-rectangle-1_26981 fill-dark_contentplashka-1_30095"
                ></div>
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultsizesmall;
