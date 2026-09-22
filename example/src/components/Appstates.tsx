import Statecalling from "@/components/Statecalling";
import Animatestart from "@/components/Animatestart";
import Statehide from "@/components/Statehide";
import "@/styles/Appstates.css";
interface AppstatesProps {
    visible_6017_0?: boolean;
    visible_6017_1?: boolean;
    id?: string;
    className?: string;
    slot_421_10568?: React.ReactNode;
    slot_421_10569?: React.ReactNode;
}
const Appstates = (props: AppstatesProps) => {
    const {
        visible_6017_0 = true,
        visible_6017_1 = true,
        id,
        className = "",
        slot_421_10568,
        slot_421_10569
    } = props;

    return (
        <div
            className={["component-421_10567", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10567"
                className="Pixso-symbol-421_10567 pixso-relative-flex"
            >
                {slot_421_10568 ??
                    (visible_6017_0 && (
                        <Statecalling
                            id="421_10568"
                            className="Pixso-instance-421_10568 pixso-relative-no-shrink"
                            slot_421_10554={
                                <Animatestart
                                    id="421_10554"
                                    className="Pixso-instance-421_10554 pixso-relative-no-shrink"
                                    slot_421_10540={
                                        <div
                                            id="421_10540"
                                            className="Pixso-instance-421_10540 pixso-relative-no-shrink"
                                        ></div>
                                    }
                                ></Animatestart>
                            }
                        ></Statecalling>
                    ))}
                {slot_421_10569 ??
                    (visible_6017_1 && (
                        <Statehide
                            id="421_10569"
                            className="Pixso-instance-421_10569 pixso-relative-no-shrink"
                            slot_421_10564={
                                <div
                                    id="421_10564"
                                    className="Pixso-instance-421_10564 pixso-relative-no-shrink"
                                ></div>
                            }
                        ></Statehide>
                    ))}
            </div>
        </div>
    );
};
export default Appstates;
