import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Frame557322494.css";
const Frame557322494 = () => {
    const navigate = useNavigate();

    const mousedown_5573_22585_421_11156_3139_4820 = () => {
        navigate(getPathByGuid("5573:23218"), {
            state: {
                from: "5573:22585_421:11156_3139:4820",
                et: "md"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_22494"
                className="Pixso-frame-5573_22494 pixso-relative-no-shrink"
            >
                <div
                    id="5573_22495"
                    className="Pixso-rectangle-5573_22495"
                ></div>
                <div
                    id="5573_22496"
                    className="Pixso-rectangle-5573_22496"
                ></div>
                <div id="5573_22514" className="Pixso-frame-5573_22514"></div>
                <StatusBarlocal
                    id="5573_22584"
                    className="Pixso-instance-5573_22584"
                    slot_3007_9528={
                        <div
                            id="461_39247"
                            className="Pixso-instance-461_39247 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_39244"
                            className="Pixso-instance-461_39244 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_39227"
                            className="Pixso-vector-461_39227"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_39250"
                            className="Pixso-instance-461_39250 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_39251"
                                    className="Pixso-instance-461_39251 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_39254"
                                    className="Pixso-paragraph-461_39254 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_39237"
                            className="Pixso-paragraph-461_39237 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_22585"
                    className="Pixso-instance-5573_22585"
                    onMousedown5573_22585421_111563139_4820={withStopPropagation(
                        mousedown_5573_22585_421_11156_3139_4820
                    )}
                    slot_421_11171={
                        <div
                            id="461_31235"
                            className="Pixso-vector-461_31235"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557322494;
