import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Frame557322677.css";
const Frame557322677 = () => {
    const navigate = useNavigate();

    const mousedown_5573_22769_421_11156_3139_4820 = () => {
        navigate(getPathByGuid("0:0"), {
            state: {
                from: "5573:22769_421:11156_3139:4820",
                et: "md"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_22677"
                className="Pixso-frame-5573_22677 pixso-relative-no-shrink"
            >
                <div
                    id="5573_22678"
                    className="Pixso-rectangle-5573_22678"
                ></div>
                <div
                    id="5573_22679"
                    className="Pixso-rectangle-5573_22679"
                ></div>
                <div
                    id="5573_22680"
                    className="Pixso-rectangle-5573_22680"
                ></div>
                <div id="5573_22725" className="Pixso-frame-5573_22725"></div>
                <StatusBarlocal
                    id="5573_22768"
                    className="Pixso-instance-5573_22768"
                    slot_3007_9528={
                        <div
                            id="461_38667"
                            className="Pixso-instance-461_38667 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_38664"
                            className="Pixso-instance-461_38664 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_38647"
                            className="Pixso-vector-461_38647"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_38670"
                            className="Pixso-instance-461_38670 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_38671"
                                    className="Pixso-instance-461_38671 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_38674"
                                    className="Pixso-paragraph-461_38674 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_38657"
                            className="Pixso-paragraph-461_38657 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_22769"
                    className="Pixso-instance-5573_22769"
                    onMousedown5573_22769421_111563139_4820={withStopPropagation(
                        mousedown_5573_22769_421_11156_3139_4820
                    )}
                    slot_421_11171={
                        <div
                            id="461_30883"
                            className="Pixso-vector-461_30883"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557322677;
