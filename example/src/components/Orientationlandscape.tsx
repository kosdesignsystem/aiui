import Background from "@/components/Background";
import PageIndicator from "@/components/Pageindicator";
import "@/styles/Orientationlandscape.css";
interface OrientationlandscapeProps {
    visible_8606_5?: boolean;
    id?: string;
    className?: string;
    slot_3008_19693?: React.ReactNode;
    slot_3008_19694?: React.ReactNode;
}
const Orientationlandscape = (props: OrientationlandscapeProps) => {
    const {
        visible_8606_5 = true,
        id,
        className = "",
        slot_3008_19693,
        slot_3008_19694
    } = props;

    return (
        <div
            className={["component-3008_19689", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3008_19689"
                className="Pixso-symbol-3008_19689 pixso-position-relative"
            >
                {visible_8606_5 && (
                    <div id="3008_19690" className="Pixso-group-3008_19690">
                        <div id="3008_19692" className="Pixso-frame-3008_19692">
                            {slot_3008_19693 ?? (
                                <Background
                                    id="3008_19693"
                                    className="Pixso-instance-3008_19693"
                                    __pixsoClassOverrides={{
                                        ["overrideClass_3008_19678"]: [
                                            "fill-reef-darkprimary-inversion-3008_19674"
                                        ]
                                    }}
                                ></Background>
                            )}
                        </div>
                    </div>
                )}
                {slot_3008_19694 ?? (
                    <PageIndicator
                        id="3008_19694"
                        className="Pixso-instance-3008_19694"
                        __pixsoClassOverrides={{
                            ["overrideClass_3008_19681"]: [
                                "fill-reef-darkprimary-3008_19679"
                            ],
                            ["overrideStrokeClass_3008_19681"]: [
                                "stroke-reef-darkprimary-3008_19679"
                            ]
                        }}
                    ></PageIndicator>
                )}
            </div>
        </div>
    );
};
export default Orientationlandscape;
