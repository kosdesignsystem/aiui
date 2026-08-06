import Avatar0 from "@/components/Avatar0";
import Icongroup0 from "@/components/Icongroup0";
import { useState } from "react";
import Label from "@/components/Label";
import Iconbuttongroup0 from "@/components/Iconbuttongroup0";
import ButtonIcon0 from "@/components/Buttonicon0";
import Switch0 from "@/components/Switch0";
import "@/styles/Celltitle.css";
interface CelltitleProps {
    text_5143_0?: string;
    visible_2483032695_287275730?: boolean;
    visible_2850472941_3924155206?: boolean;
    visible_3348250743_4245032708?: boolean;
    visible_3550061270_3646243804?: boolean;
    visible_3942958253_4226924562?: boolean;
    dark_mode?: string;
    left?: string;
    right?: string;
    padding?: string;
    content?: string;
    id?: string;
    className?: string;
    slot_1004_170492?: React.ReactNode;
    slot_1004_170493?: React.ReactNode;
    slot_1004_170495?: React.ReactNode;
    slot_1004_170496?: React.ReactNode;
    slot_1004_170498?: React.ReactNode;
    slot_1004_170499?: React.ReactNode;
    slot_1004_170501?: React.ReactNode;
    slot_1004_170502?: React.ReactNode;
    slot_1004_170504?: React.ReactNode;
    slot_1004_170505?: React.ReactNode;
    slot_1004_170506?: React.ReactNode;
    slot_1004_170508?: React.ReactNode;
    slot_1004_170509?: React.ReactNode;
    slot_1004_170510?: React.ReactNode;
    slot_1004_170512?: React.ReactNode;
    slot_1004_170513?: React.ReactNode;
    slot_1004_170514?: React.ReactNode;
    slot_1004_170517?: React.ReactNode;
    slot_1004_170518?: React.ReactNode;
    slot_1004_170519?: React.ReactNode;
    slot_1004_170521?: React.ReactNode;
    slot_1004_170522?: React.ReactNode;
    slot_1004_170523?: React.ReactNode;
    slot_1004_170525?: React.ReactNode;
    slot_1004_170526?: React.ReactNode;
    slot_1004_170527?: React.ReactNode;
    slot_1004_170529?: React.ReactNode;
    slot_1004_170530?: React.ReactNode;
    slot_1004_170531?: React.ReactNode;
    slot_1004_170533?: React.ReactNode;
    slot_1004_170534?: React.ReactNode;
    slot_1004_170535?: React.ReactNode;
    slot_1004_170537?: React.ReactNode;
    slot_1004_170538?: React.ReactNode;
    slot_1004_170539?: React.ReactNode;
    slot_1004_170541?: React.ReactNode;
    slot_1004_170542?: React.ReactNode;
    slot_1004_170543?: React.ReactNode;
    slot_1004_170545?: React.ReactNode;
    slot_1004_170546?: React.ReactNode;
    slot_1004_170547?: React.ReactNode;
    slot_1004_170549?: React.ReactNode;
    slot_1004_170550?: React.ReactNode;
    slot_1004_170551?: React.ReactNode;
    slot_1004_170553?: React.ReactNode;
    slot_1004_170554?: React.ReactNode;
    slot_1004_170555?: React.ReactNode;
    slot_1004_170558?: React.ReactNode;
    slot_1004_170559?: React.ReactNode;
    slot_1004_170560?: React.ReactNode;
    slot_1004_170562?: React.ReactNode;
    slot_1004_170563?: React.ReactNode;
    slot_1004_170564?: React.ReactNode;
    slot_1004_170566?: React.ReactNode;
    slot_1004_170567?: React.ReactNode;
    slot_1004_170568?: React.ReactNode;
    slot_1004_170570?: React.ReactNode;
    slot_1004_170571?: React.ReactNode;
    slot_1004_170572?: React.ReactNode;
    slot_1004_170574?: React.ReactNode;
    slot_1004_170575?: React.ReactNode;
    slot_1004_170576?: React.ReactNode;
    slot_1004_170578?: React.ReactNode;
    slot_1004_170579?: React.ReactNode;
    slot_1004_170580?: React.ReactNode;
    slot_1004_170582?: React.ReactNode;
    slot_1004_170583?: React.ReactNode;
    slot_1004_170584?: React.ReactNode;
    slot_1004_170586?: React.ReactNode;
    slot_1004_170587?: React.ReactNode;
    slot_1004_170588?: React.ReactNode;
    slot_1004_170590?: React.ReactNode;
    slot_1004_170591?: React.ReactNode;
    slot_1004_170592?: React.ReactNode;
    slot_1004_170594?: React.ReactNode;
    slot_1004_170595?: React.ReactNode;
    slot_1004_170596?: React.ReactNode;
    slot_1004_170598?: React.ReactNode;
    slot_1004_170599?: React.ReactNode;
    slot_1004_170600?: React.ReactNode;
    slot_1004_170602?: React.ReactNode;
    slot_1004_170603?: React.ReactNode;
    slot_1004_170604?: React.ReactNode;
    slot_1004_170606?: React.ReactNode;
    slot_1004_170607?: React.ReactNode;
    slot_1004_170608?: React.ReactNode;
    slot_1004_170610?: React.ReactNode;
    slot_1004_170611?: React.ReactNode;
    slot_1004_170612?: React.ReactNode;
    slot_1004_170614?: React.ReactNode;
    slot_1004_170615?: React.ReactNode;
    slot_1004_170616?: React.ReactNode;
    slot_1004_170618?: React.ReactNode;
    slot_1004_170620?: React.ReactNode;
    slot_1004_170622?: React.ReactNode;
    slot_1004_170623?: React.ReactNode;
    slot_1004_170625?: React.ReactNode;
    slot_1004_170626?: React.ReactNode;
    slot_1004_170628?: React.ReactNode;
    slot_1004_170629?: React.ReactNode;
    slot_1004_170632?: React.ReactNode;
    slot_1004_170633?: React.ReactNode;
    slot_1004_170635?: React.ReactNode;
    slot_1004_170636?: React.ReactNode;
    slot_1004_170638?: React.ReactNode;
    slot_1004_170639?: React.ReactNode;
    slot_1004_170641?: React.ReactNode;
    slot_1004_170642?: React.ReactNode;
    slot_1004_170644?: React.ReactNode;
    slot_1004_170645?: React.ReactNode;
    slot_1004_170647?: React.ReactNode;
    slot_1004_170648?: React.ReactNode;
    slot_1004_170650?: React.ReactNode;
    slot_1004_170651?: React.ReactNode;
    slot_1004_170653?: React.ReactNode;
    slot_1004_170654?: React.ReactNode;
    slot_1004_170656?: React.ReactNode;
    slot_1004_170657?: React.ReactNode;
    slot_1004_170659?: React.ReactNode;
    slot_1004_170660?: React.ReactNode;
    slot_1004_170662?: React.ReactNode;
    slot_1004_170663?: React.ReactNode;
}
const Celltitle = (props: CelltitleProps) => {
    const {
        text_5143_0 = "Title",
        visible_2483032695_287275730 = true,
        visible_2850472941_3924155206 = true,
        visible_3348250743_4245032708 = true,
        visible_3550061270_3646243804 = true,
        visible_3942958253_4226924562 = true,
        dark_mode,
        left,
        right,
        padding,
        content,
        id,
        className = "",
        slot_1004_170492,
        slot_1004_170493,
        slot_1004_170495,
        slot_1004_170496,
        slot_1004_170498,
        slot_1004_170499,
        slot_1004_170501,
        slot_1004_170502,
        slot_1004_170504,
        slot_1004_170505,
        slot_1004_170506,
        slot_1004_170508,
        slot_1004_170509,
        slot_1004_170510,
        slot_1004_170512,
        slot_1004_170513,
        slot_1004_170514,
        slot_1004_170517,
        slot_1004_170518,
        slot_1004_170519,
        slot_1004_170521,
        slot_1004_170522,
        slot_1004_170523,
        slot_1004_170525,
        slot_1004_170526,
        slot_1004_170527,
        slot_1004_170529,
        slot_1004_170530,
        slot_1004_170531,
        slot_1004_170533,
        slot_1004_170534,
        slot_1004_170535,
        slot_1004_170537,
        slot_1004_170538,
        slot_1004_170539,
        slot_1004_170541,
        slot_1004_170542,
        slot_1004_170543,
        slot_1004_170545,
        slot_1004_170546,
        slot_1004_170547,
        slot_1004_170549,
        slot_1004_170550,
        slot_1004_170551,
        slot_1004_170553,
        slot_1004_170554,
        slot_1004_170555,
        slot_1004_170558,
        slot_1004_170559,
        slot_1004_170560,
        slot_1004_170562,
        slot_1004_170563,
        slot_1004_170564,
        slot_1004_170566,
        slot_1004_170567,
        slot_1004_170568,
        slot_1004_170570,
        slot_1004_170571,
        slot_1004_170572,
        slot_1004_170574,
        slot_1004_170575,
        slot_1004_170576,
        slot_1004_170578,
        slot_1004_170579,
        slot_1004_170580,
        slot_1004_170582,
        slot_1004_170583,
        slot_1004_170584,
        slot_1004_170586,
        slot_1004_170587,
        slot_1004_170588,
        slot_1004_170590,
        slot_1004_170591,
        slot_1004_170592,
        slot_1004_170594,
        slot_1004_170595,
        slot_1004_170596,
        slot_1004_170598,
        slot_1004_170599,
        slot_1004_170600,
        slot_1004_170602,
        slot_1004_170603,
        slot_1004_170604,
        slot_1004_170606,
        slot_1004_170607,
        slot_1004_170608,
        slot_1004_170610,
        slot_1004_170611,
        slot_1004_170612,
        slot_1004_170614,
        slot_1004_170615,
        slot_1004_170616,
        slot_1004_170618,
        slot_1004_170620,
        slot_1004_170622,
        slot_1004_170623,
        slot_1004_170625,
        slot_1004_170626,
        slot_1004_170628,
        slot_1004_170629,
        slot_1004_170632,
        slot_1004_170633,
        slot_1004_170635,
        slot_1004_170636,
        slot_1004_170638,
        slot_1004_170639,
        slot_1004_170641,
        slot_1004_170642,
        slot_1004_170644,
        slot_1004_170645,
        slot_1004_170647,
        slot_1004_170648,
        slot_1004_170650,
        slot_1004_170651,
        slot_1004_170653,
        slot_1004_170654,
        slot_1004_170656,
        slot_1004_170657,
        slot_1004_170659,
        slot_1004_170660,
        slot_1004_170662,
        slot_1004_170663
    } = props;

    const [state_1004_170514, setState_1004_170514] = useState("selected");
    const [disabled_1004_170514, setDisabled_1004_170514] = useState("no");
    const [transitionConfig1004_170514, setTransitionConfig1004_170514] =
        useState({});
    const [state_1004_170519, setState_1004_170519] = useState("selected");
    const [disabled_1004_170519, setDisabled_1004_170519] = useState("no");
    const [transitionConfig1004_170519, setTransitionConfig1004_170519] =
        useState({});
    const [state_1004_170523, setState_1004_170523] = useState("deselected");
    const [disabled_1004_170523, setDisabled_1004_170523] = useState("no");
    const [transitionConfig1004_170523, setTransitionConfig1004_170523] =
        useState({});
    const [state_1004_170531, setState_1004_170531] = useState("deselected");
    const [disabled_1004_170531, setDisabled_1004_170531] = useState("no");
    const [transitionConfig1004_170531, setTransitionConfig1004_170531] =
        useState({});
    const [type_894_155471, setType_894_155471] = useState("default");
    const [size_894_155471, setSize_894_155471] = useState("medium");
    const [state_894_155471, setState_894_155471] = useState("default");
    const [state_1004_170555, setState_1004_170555] = useState("selected");
    const [disabled_1004_170555, setDisabled_1004_170555] = useState("no");
    const [transitionConfig1004_170555, setTransitionConfig1004_170555] =
        useState({});
    const [state_1004_170560, setState_1004_170560] = useState("selected");
    const [disabled_1004_170560, setDisabled_1004_170560] = useState("no");
    const [transitionConfig1004_170560, setTransitionConfig1004_170560] =
        useState({});
    const [state_1004_170564, setState_1004_170564] = useState("deselected");
    const [disabled_1004_170564, setDisabled_1004_170564] = useState("no");
    const [transitionConfig1004_170564, setTransitionConfig1004_170564] =
        useState({});
    const [state_1004_170572, setState_1004_170572] = useState("deselected");
    const [disabled_1004_170572, setDisabled_1004_170572] = useState("no");
    const [transitionConfig1004_170572, setTransitionConfig1004_170572] =
        useState({});
    const [type_1004_170588, setType_1004_170588] = useState("default");
    const [transitionConfig1004_170588, setTransitionConfig1004_170588] =
        useState({});
    const [type_1004_170592, setType_1004_170592] = useState("default");
    const [transitionConfig1004_170592, setTransitionConfig1004_170592] =
        useState({});
    const [type_1004_170596, setType_1004_170596] = useState("default");
    const [transitionConfig1004_170596, setTransitionConfig1004_170596] =
        useState({});
    const [type_1004_170600, setType_1004_170600] = useState("default");
    const [transitionConfig1004_170600, setTransitionConfig1004_170600] =
        useState({});
    const [state_1004_170629, setState_1004_170629] = useState("selected");
    const [disabled_1004_170629, setDisabled_1004_170629] = useState("no");
    const [transitionConfig1004_170629, setTransitionConfig1004_170629] =
        useState({});
    const [state_1004_170633, setState_1004_170633] = useState("selected");
    const [disabled_1004_170633, setDisabled_1004_170633] = useState("no");
    const [transitionConfig1004_170633, setTransitionConfig1004_170633] =
        useState({});
    const [state_1004_170636, setState_1004_170636] = useState("deselected");
    const [disabled_1004_170636, setDisabled_1004_170636] = useState("no");
    const [transitionConfig1004_170636, setTransitionConfig1004_170636] =
        useState({});
    const [state_1004_170642, setState_1004_170642] = useState("deselected");
    const [disabled_1004_170642, setDisabled_1004_170642] = useState("no");
    const [transitionConfig1004_170642, setTransitionConfig1004_170642] =
        useState({});
    const [type_1004_170654, setType_1004_170654] = useState("default");
    const [transitionConfig1004_170654, setTransitionConfig1004_170654] =
        useState({});
    const [type_1004_170657, setType_1004_170657] = useState("default");
    const [transitionConfig1004_170657, setTransitionConfig1004_170657] =
        useState({});
    const [transitionConfig894_155471, setTransitionConfig894_155471] =
        useState({});
    const transitionConfig: any = {
        "1004:170657_894:155598_c": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const click_1004_170514 = () => {
        setState_1004_170514("deselected");
        setDisabled_1004_170514("no");
    };

    const click_1004_170519 = () => {
        setState_1004_170519("deselected");
        setDisabled_1004_170519("no");
    };

    const click_1004_170523 = () => {
        setState_1004_170523("selected");
        setDisabled_1004_170523("no");
    };

    const click_1004_170531 = () => {
        setState_1004_170531("selected");
        setDisabled_1004_170531("no");
    };

    const click_1004_170555 = () => {
        setState_1004_170555("deselected");
        setDisabled_1004_170555("no");
    };

    const click_1004_170560 = () => {
        setState_1004_170560("deselected");
        setDisabled_1004_170560("no");
    };

    const click_1004_170564 = () => {
        setState_1004_170564("selected");
        setDisabled_1004_170564("no");
    };

    const click_1004_170572 = () => {
        setState_1004_170572("selected");
        setDisabled_1004_170572("no");
    };

    const click_1004_170588 = () => {
        setType_1004_170588("loading");
    };

    const click_1004_170592 = () => {
        setType_1004_170592("loading");
    };

    const click_1004_170596 = () => {
        setType_1004_170596("loading");
    };

    const click_1004_170600 = () => {
        setType_1004_170600("loading");
    };

    const click_1004_170629 = () => {
        setState_1004_170629("deselected");
        setDisabled_1004_170629("no");
    };

    const click_1004_170633 = () => {
        setState_1004_170633("deselected");
        setDisabled_1004_170633("no");
    };

    const click_1004_170636 = () => {
        setState_1004_170636("selected");
        setDisabled_1004_170636("no");
    };

    const click_1004_170642 = () => {
        setState_1004_170642("selected");
        setDisabled_1004_170642("no");
    };

    const click_1004_170654 = () => {
        setType_1004_170654("loading");
    };

    const click_1004_170657 = () => {
        setType_1004_170657("loading");
    };

    const mouseover_894_155471 = () => {
        setType_894_155471("default");
        setSize_894_155471("medium");
        setState_894_155471("hover");
    };

    return (
        <div
            className={["component-1004_170490", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1004_170490" className="Pixso-symbol-1004_170490">
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170491"
                            className="Pixso-symbol-1004_170491"
                        >
                            {slot_1004_170492 ?? (
                                <Avatar0
                                    id="1004_170492"
                                    className="Pixso-instance-1004_170492"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170493 ?? (
                                <p
                                    id="1004_170493"
                                    className="Pixso-paragraph-1004_170493 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170494"
                            className="Pixso-symbol-1004_170494"
                        >
                            {slot_1004_170495 ?? (
                                <Avatar0
                                    id="1004_170495"
                                    className="Pixso-instance-1004_170495"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170496 ?? (
                                <p
                                    id="1004_170496"
                                    className="Pixso-paragraph-1004_170496 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170497"
                            className="Pixso-symbol-1004_170497"
                        >
                            {slot_1004_170498 ?? (
                                <div
                                    id="1004_170498"
                                    className="Pixso-instance-1004_170498"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170499 ?? (
                                <p
                                    id="1004_170499"
                                    className="Pixso-paragraph-1004_170499 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170500"
                            className="Pixso-symbol-1004_170500"
                        >
                            {slot_1004_170501 ?? (
                                <div
                                    id="1004_170501"
                                    className="Pixso-instance-1004_170501"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170502 ?? (
                                <p
                                    id="1004_170502"
                                    className="Pixso-paragraph-1004_170502 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170503"
                            className="Pixso-symbol-1004_170503"
                        >
                            {slot_1004_170504 ?? (
                                <Avatar0
                                    id="1004_170504"
                                    className="Pixso-instance-1004_170504"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170505 ?? (
                                <p
                                    id="1004_170505"
                                    className="Pixso-paragraph-1004_170505 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170506 ?? (
                                <Icongroup0
                                    id="1004_170506"
                                    className="Pixso-instance-1004_170506"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170507"
                            className="Pixso-symbol-1004_170507"
                        >
                            {slot_1004_170508 ?? (
                                <Avatar0
                                    id="1004_170508"
                                    className="Pixso-instance-1004_170508"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170509 ?? (
                                <p
                                    id="1004_170509"
                                    className="Pixso-paragraph-1004_170509 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170510 ?? (
                                <Icongroup0
                                    id="1004_170510"
                                    className="Pixso-instance-1004_170510"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170511"
                            className="Pixso-symbol-1004_170511"
                        >
                            {slot_1004_170512 ?? (
                                <Avatar0
                                    id="1004_170512"
                                    className="Pixso-instance-1004_170512"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170513 ?? (
                                <p
                                    id="1004_170513"
                                    className="Pixso-paragraph-1004_170513 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170514 ?? (
                                <div
                                    id="1004_170514"
                                    className="Pixso-instance-1004_170514"
                                    state={state_1004_170514}
                                    disabled={disabled_1004_170514}
                                    transitionConfig={
                                        transitionConfig1004_170514
                                    }
                                    click={click_1004_170514}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170515"
                            className="Pixso-symbol-1004_170515"
                        >
                            <div
                                id="1004_170516"
                                className="Pixso-rectangle-1004_170516"
                            ></div>
                            {slot_1004_170517 ?? (
                                <Avatar0
                                    id="1004_170517"
                                    className="Pixso-instance-1004_170517"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170518 ?? (
                                <p
                                    id="1004_170518"
                                    className="Pixso-paragraph-1004_170518 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170519 ?? (
                                <div
                                    id="1004_170519"
                                    className="Pixso-instance-1004_170519"
                                    state={state_1004_170519}
                                    disabled={disabled_1004_170519}
                                    transitionConfig={
                                        transitionConfig1004_170519
                                    }
                                    click={click_1004_170519}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170520"
                            className="Pixso-symbol-1004_170520"
                        >
                            {slot_1004_170521 ?? (
                                <Avatar0
                                    id="1004_170521"
                                    className="Pixso-instance-1004_170521"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170522 ?? (
                                <p
                                    id="1004_170522"
                                    className="Pixso-paragraph-1004_170522 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170523 ?? (
                                <div
                                    id="1004_170523"
                                    className="Pixso-instance-1004_170523"
                                    state={state_1004_170523}
                                    disabled={disabled_1004_170523}
                                    transitionConfig={
                                        transitionConfig1004_170523
                                    }
                                    click={click_1004_170523}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170524"
                            className="Pixso-symbol-1004_170524"
                        >
                            {slot_1004_170525 ?? (
                                <Avatar0
                                    id="1004_170525"
                                    className="Pixso-instance-1004_170525"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170526 ?? (
                                <p
                                    id="1004_170526"
                                    className="Pixso-paragraph-1004_170526 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170527 ?? (
                                <Label
                                    id="1004_170527"
                                    className="Pixso-instance-1004_170527"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170528"
                            className="Pixso-symbol-1004_170528"
                        >
                            {slot_1004_170529 ?? (
                                <Avatar0
                                    id="1004_170529"
                                    className="Pixso-instance-1004_170529"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170530 ?? (
                                <p
                                    id="1004_170530"
                                    className="Pixso-paragraph-1004_170530 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170531 ?? (
                                <div
                                    id="1004_170531"
                                    className="Pixso-instance-1004_170531"
                                    state={state_1004_170531}
                                    disabled={disabled_1004_170531}
                                    transitionConfig={
                                        transitionConfig1004_170531
                                    }
                                    click={click_1004_170531}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170532"
                            className="Pixso-symbol-1004_170532"
                        >
                            {slot_1004_170533 ?? (
                                <Avatar0
                                    id="1004_170533"
                                    className="Pixso-instance-1004_170533"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170534 ?? (
                                <p
                                    id="1004_170534"
                                    className="Pixso-paragraph-1004_170534 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170535 ?? (
                                <Label
                                    id="1004_170535"
                                    className="Pixso-instance-1004_170535"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170536"
                            className="Pixso-symbol-1004_170536"
                        >
                            {slot_1004_170537 ?? (
                                <Avatar0
                                    id="1004_170537"
                                    className="Pixso-instance-1004_170537"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170538 ?? (
                                <p
                                    id="1004_170538"
                                    className="Pixso-paragraph-1004_170538 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170539 ?? (
                                <Iconbuttongroup0
                                    id="1004_170539"
                                    className="Pixso-instance-1004_170539"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170540"
                            className="Pixso-symbol-1004_170540"
                        >
                            {slot_1004_170541 ?? (
                                <Avatar0
                                    id="1004_170541"
                                    className="Pixso-instance-1004_170541"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170542 ?? (
                                <p
                                    id="1004_170542"
                                    className="Pixso-paragraph-1004_170542 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170543 ?? (
                                <Iconbuttongroup0
                                    id="1004_170543"
                                    className="Pixso-instance-1004_170543"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_894_155471={
                                        <ButtonIcon0
                                            id="894_155471"
                                            className="Pixso-instance-894_155471"
                                            type={type_894_155471}
                                            size={size_894_155471}
                                            state={state_894_155471}
                                            transitionConfig={
                                                transitionConfig894_155471
                                            }
                                            mouseover={mouseover_894_155471}
                                            slot_504_2318={
                                                <div
                                                    id="504_2318"
                                                    className="Pixso-instance-504_2318"
                                                ></div>
                                            }
                                        ></ButtonIcon0>
                                    }
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170544"
                            className="Pixso-symbol-1004_170544"
                        >
                            {slot_1004_170545 ?? (
                                <div
                                    id="1004_170545"
                                    className="Pixso-instance-1004_170545"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170546 ?? (
                                <p
                                    id="1004_170546"
                                    className="Pixso-paragraph-1004_170546 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170547 ?? (
                                <Icongroup0
                                    id="1004_170547"
                                    className="Pixso-instance-1004_170547"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170548"
                            className="Pixso-symbol-1004_170548"
                        >
                            {slot_1004_170549 ?? (
                                <div
                                    id="1004_170549"
                                    className="Pixso-instance-1004_170549"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170550 ?? (
                                <p
                                    id="1004_170550"
                                    className="Pixso-paragraph-1004_170550 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170551 ?? (
                                <Icongroup0
                                    id="1004_170551"
                                    className="Pixso-instance-1004_170551"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170552"
                            className="Pixso-symbol-1004_170552"
                        >
                            {slot_1004_170553 ?? (
                                <div
                                    id="1004_170553"
                                    className="Pixso-instance-1004_170553"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170554 ?? (
                                <p
                                    id="1004_170554"
                                    className="Pixso-paragraph-1004_170554 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170555 ?? (
                                <div
                                    id="1004_170555"
                                    className="Pixso-instance-1004_170555"
                                    state={state_1004_170555}
                                    disabled={disabled_1004_170555}
                                    transitionConfig={
                                        transitionConfig1004_170555
                                    }
                                    click={click_1004_170555}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170556"
                            className="Pixso-symbol-1004_170556"
                        >
                            <div
                                id="1004_170557"
                                className="Pixso-rectangle-1004_170557"
                            ></div>
                            {slot_1004_170558 ?? (
                                <div
                                    id="1004_170558"
                                    className="Pixso-instance-1004_170558"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170559 ?? (
                                <p
                                    id="1004_170559"
                                    className="Pixso-paragraph-1004_170559 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170560 ?? (
                                <div
                                    id="1004_170560"
                                    className="Pixso-instance-1004_170560"
                                    state={state_1004_170560}
                                    disabled={disabled_1004_170560}
                                    transitionConfig={
                                        transitionConfig1004_170560
                                    }
                                    click={click_1004_170560}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170561"
                            className="Pixso-symbol-1004_170561"
                        >
                            {slot_1004_170562 ?? (
                                <div
                                    id="1004_170562"
                                    className="Pixso-instance-1004_170562"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170563 ?? (
                                <p
                                    id="1004_170563"
                                    className="Pixso-paragraph-1004_170563 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170564 ?? (
                                <div
                                    id="1004_170564"
                                    className="Pixso-instance-1004_170564"
                                    state={state_1004_170564}
                                    disabled={disabled_1004_170564}
                                    transitionConfig={
                                        transitionConfig1004_170564
                                    }
                                    click={click_1004_170564}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170565"
                            className="Pixso-symbol-1004_170565"
                        >
                            {slot_1004_170566 ?? (
                                <div
                                    id="1004_170566"
                                    className="Pixso-instance-1004_170566"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170567 ?? (
                                <p
                                    id="1004_170567"
                                    className="Pixso-paragraph-1004_170567 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170568 ?? (
                                <Label
                                    id="1004_170568"
                                    className="Pixso-instance-1004_170568"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170569"
                            className="Pixso-symbol-1004_170569"
                        >
                            {slot_1004_170570 ?? (
                                <div
                                    id="1004_170570"
                                    className="Pixso-instance-1004_170570"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170571 ?? (
                                <p
                                    id="1004_170571"
                                    className="Pixso-paragraph-1004_170571 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170572 ?? (
                                <div
                                    id="1004_170572"
                                    className="Pixso-instance-1004_170572"
                                    state={state_1004_170572}
                                    disabled={disabled_1004_170572}
                                    transitionConfig={
                                        transitionConfig1004_170572
                                    }
                                    click={click_1004_170572}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170573"
                            className="Pixso-symbol-1004_170573"
                        >
                            {slot_1004_170574 ?? (
                                <div
                                    id="1004_170574"
                                    className="Pixso-instance-1004_170574"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170575 ?? (
                                <p
                                    id="1004_170575"
                                    className="Pixso-paragraph-1004_170575 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170576 ?? (
                                <Label
                                    id="1004_170576"
                                    className="Pixso-instance-1004_170576"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170577"
                            className="Pixso-symbol-1004_170577"
                        >
                            {slot_1004_170578 ?? (
                                <div
                                    id="1004_170578"
                                    className="Pixso-instance-1004_170578"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170579 ?? (
                                <p
                                    id="1004_170579"
                                    className="Pixso-paragraph-1004_170579 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170580 ?? (
                                <Iconbuttongroup0
                                    id="1004_170580"
                                    className="Pixso-instance-1004_170580"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170581"
                            className="Pixso-symbol-1004_170581"
                        >
                            {slot_1004_170582 ?? (
                                <div
                                    id="1004_170582"
                                    className="Pixso-instance-1004_170582"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170583 ?? (
                                <p
                                    id="1004_170583"
                                    className="Pixso-paragraph-1004_170583 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170584 ?? (
                                <Iconbuttongroup0
                                    id="1004_170584"
                                    className="Pixso-instance-1004_170584"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_894_155471={
                                        <ButtonIcon0
                                            id="894_155471"
                                            className="Pixso-instance-894_155471"
                                            type={type_894_155471}
                                            size={size_894_155471}
                                            state={state_894_155471}
                                            transitionConfig={
                                                transitionConfig894_155471
                                            }
                                            mouseover={mouseover_894_155471}
                                            slot_504_2318={
                                                <div
                                                    id="504_2318"
                                                    className="Pixso-instance-504_2318"
                                                ></div>
                                            }
                                        ></ButtonIcon0>
                                    }
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170585"
                            className="Pixso-symbol-1004_170585"
                        >
                            {slot_1004_170586 ?? (
                                <Avatar0
                                    id="1004_170586"
                                    className="Pixso-instance-1004_170586"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170587 ?? (
                                <p
                                    id="1004_170587"
                                    className="Pixso-paragraph-1004_170587 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170588 ?? (
                                <Switch0
                                    id="1004_170588"
                                    className="Pixso-instance-1004_170588"
                                    type={type_1004_170588}
                                    transitionConfig={
                                        transitionConfig1004_170588
                                    }
                                    click={click_1004_170588}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170589"
                            className="Pixso-symbol-1004_170589"
                        >
                            {slot_1004_170590 ?? (
                                <Avatar0
                                    id="1004_170590"
                                    className="Pixso-instance-1004_170590"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170591 ?? (
                                <p
                                    id="1004_170591"
                                    className="Pixso-paragraph-1004_170591 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170592 ?? (
                                <Switch0
                                    id="1004_170592"
                                    className="Pixso-instance-1004_170592"
                                    type={type_1004_170592}
                                    transitionConfig={
                                        transitionConfig1004_170592
                                    }
                                    click={click_1004_170592}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170593"
                            className="Pixso-symbol-1004_170593"
                        >
                            {slot_1004_170594 ?? (
                                <div
                                    id="1004_170594"
                                    className="Pixso-instance-1004_170594"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170595 ?? (
                                <p
                                    id="1004_170595"
                                    className="Pixso-paragraph-1004_170595 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170596 ?? (
                                <Switch0
                                    id="1004_170596"
                                    className="Pixso-instance-1004_170596"
                                    type={type_1004_170596}
                                    transitionConfig={
                                        transitionConfig1004_170596
                                    }
                                    click={click_1004_170596}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170597"
                            className="Pixso-symbol-1004_170597"
                        >
                            {slot_1004_170598 ?? (
                                <div
                                    id="1004_170598"
                                    className="Pixso-instance-1004_170598"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170599 ?? (
                                <p
                                    id="1004_170599"
                                    className="Pixso-paragraph-1004_170599 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170600 ?? (
                                <Switch0
                                    id="1004_170600"
                                    className="Pixso-instance-1004_170600"
                                    type={type_1004_170600}
                                    transitionConfig={
                                        transitionConfig1004_170600
                                    }
                                    click={click_1004_170600}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170601"
                            className="Pixso-symbol-1004_170601"
                        >
                            {slot_1004_170602 ?? (
                                <Avatar0
                                    id="1004_170602"
                                    className="Pixso-instance-1004_170602"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170603 ?? (
                                <p
                                    id="1004_170603"
                                    className="Pixso-paragraph-1004_170603 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170604 ?? (
                                <p
                                    id="1004_170604"
                                    className="Pixso-paragraph-1004_170604 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170605"
                            className="Pixso-symbol-1004_170605"
                        >
                            {slot_1004_170606 ?? (
                                <Avatar0
                                    id="1004_170606"
                                    className="Pixso-instance-1004_170606"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar0>
                            )}
                            {slot_1004_170607 ?? (
                                <p
                                    id="1004_170607"
                                    className="Pixso-paragraph-1004_170607 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170608 ?? (
                                <p
                                    id="1004_170608"
                                    className="Pixso-paragraph-1004_170608 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170609"
                            className="Pixso-symbol-1004_170609"
                        >
                            {slot_1004_170610 ?? (
                                <div
                                    id="1004_170610"
                                    className="Pixso-instance-1004_170610"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170611 ?? (
                                <p
                                    id="1004_170611"
                                    className="Pixso-paragraph-1004_170611 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170612 ?? (
                                <p
                                    id="1004_170612"
                                    className="Pixso-paragraph-1004_170612 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170613"
                            className="Pixso-symbol-1004_170613"
                        >
                            {slot_1004_170614 ?? (
                                <div
                                    id="1004_170614"
                                    className="Pixso-instance-1004_170614"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1004_170615 ?? (
                                <p
                                    id="1004_170615"
                                    className="Pixso-paragraph-1004_170615 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170616 ?? (
                                <p
                                    id="1004_170616"
                                    className="Pixso-paragraph-1004_170616 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170617"
                            className="Pixso-symbol-1004_170617"
                        >
                            {slot_1004_170618 ?? (
                                <p
                                    id="1004_170618"
                                    className="Pixso-paragraph-1004_170618 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170619"
                            className="Pixso-symbol-1004_170619"
                        >
                            {slot_1004_170620 ?? (
                                <p
                                    id="1004_170620"
                                    className="Pixso-paragraph-1004_170620 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170621"
                            className="Pixso-symbol-1004_170621"
                        >
                            {slot_1004_170622 ?? (
                                <p
                                    id="1004_170622"
                                    className="Pixso-paragraph-1004_170622 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170623 ?? (
                                <Icongroup0
                                    id="1004_170623"
                                    className="Pixso-instance-1004_170623"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170624"
                            className="Pixso-symbol-1004_170624"
                        >
                            {slot_1004_170625 ?? (
                                <p
                                    id="1004_170625"
                                    className="Pixso-paragraph-1004_170625 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170626 ?? (
                                <Icongroup0
                                    id="1004_170626"
                                    className="Pixso-instance-1004_170626"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_894_155368={
                                        <div
                                            id="894_155368"
                                            className="Pixso-instance-894_155368"
                                        ></div>
                                    }
                                ></Icongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170627"
                            className="Pixso-symbol-1004_170627"
                        >
                            {slot_1004_170628 ?? (
                                <p
                                    id="1004_170628"
                                    className="Pixso-paragraph-1004_170628 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170629 ?? (
                                <div
                                    id="1004_170629"
                                    className="Pixso-instance-1004_170629"
                                    state={state_1004_170629}
                                    disabled={disabled_1004_170629}
                                    transitionConfig={
                                        transitionConfig1004_170629
                                    }
                                    click={click_1004_170629}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170630"
                            className="Pixso-symbol-1004_170630"
                        >
                            <div
                                id="1004_170631"
                                className="Pixso-rectangle-1004_170631"
                            ></div>
                            {slot_1004_170632 ?? (
                                <p
                                    id="1004_170632"
                                    className="Pixso-paragraph-1004_170632 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170633 ?? (
                                <div
                                    id="1004_170633"
                                    className="Pixso-instance-1004_170633"
                                    state={state_1004_170633}
                                    disabled={disabled_1004_170633}
                                    transitionConfig={
                                        transitionConfig1004_170633
                                    }
                                    click={click_1004_170633}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "New value" && (
                        <div
                            id="1004_170634"
                            className="Pixso-symbol-1004_170634"
                        >
                            {slot_1004_170635 ?? (
                                <p
                                    id="1004_170635"
                                    className="Pixso-paragraph-1004_170635 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170636 ?? (
                                <div
                                    id="1004_170636"
                                    className="Pixso-instance-1004_170636"
                                    state={state_1004_170636}
                                    disabled={disabled_1004_170636}
                                    transitionConfig={
                                        transitionConfig1004_170636
                                    }
                                    click={click_1004_170636}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170637"
                            className="Pixso-symbol-1004_170637"
                        >
                            {slot_1004_170638 ?? (
                                <p
                                    id="1004_170638"
                                    className="Pixso-paragraph-1004_170638 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170639 ?? (
                                <Label
                                    id="1004_170639"
                                    className="Pixso-instance-1004_170639"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170640"
                            className="Pixso-symbol-1004_170640"
                        >
                            {slot_1004_170641 ?? (
                                <p
                                    id="1004_170641"
                                    className="Pixso-paragraph-1004_170641 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170642 ?? (
                                <div
                                    id="1004_170642"
                                    className="Pixso-instance-1004_170642"
                                    state={state_1004_170642}
                                    disabled={disabled_1004_170642}
                                    transitionConfig={
                                        transitionConfig1004_170642
                                    }
                                    click={click_1004_170642}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170643"
                            className="Pixso-symbol-1004_170643"
                        >
                            {slot_1004_170644 ?? (
                                <p
                                    id="1004_170644"
                                    className="Pixso-paragraph-1004_170644 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170645 ?? (
                                <Label
                                    id="1004_170645"
                                    className="Pixso-instance-1004_170645"
                                    type="accent"
                                    size="big"
                                ></Label>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170646"
                            className="Pixso-symbol-1004_170646"
                        >
                            {slot_1004_170647 ?? (
                                <p
                                    id="1004_170647"
                                    className="Pixso-paragraph-1004_170647 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170648 ?? (
                                <Iconbuttongroup0
                                    id="1004_170648"
                                    className="Pixso-instance-1004_170648"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170649"
                            className="Pixso-symbol-1004_170649"
                        >
                            {slot_1004_170650 ?? (
                                <p
                                    id="1004_170650"
                                    className="Pixso-paragraph-1004_170650 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170651 ?? (
                                <Iconbuttongroup0
                                    id="1004_170651"
                                    className="Pixso-instance-1004_170651"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_894_155471={
                                        <ButtonIcon0
                                            id="894_155471"
                                            className="Pixso-instance-894_155471"
                                            type={type_894_155471}
                                            size={size_894_155471}
                                            state={state_894_155471}
                                            transitionConfig={
                                                transitionConfig894_155471
                                            }
                                            mouseover={mouseover_894_155471}
                                            slot_504_2318={
                                                <div
                                                    id="504_2318"
                                                    className="Pixso-instance-504_2318"
                                                ></div>
                                            }
                                        ></ButtonIcon0>
                                    }
                                ></Iconbuttongroup0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170652"
                            className="Pixso-symbol-1004_170652"
                        >
                            {slot_1004_170653 ?? (
                                <p
                                    id="1004_170653"
                                    className="Pixso-paragraph-1004_170653 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170654 ?? (
                                <Switch0
                                    id="1004_170654"
                                    className="Pixso-instance-1004_170654"
                                    type={type_1004_170654}
                                    transitionConfig={
                                        transitionConfig1004_170654
                                    }
                                    click={click_1004_170654}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170655"
                            className="Pixso-symbol-1004_170655"
                        >
                            {slot_1004_170656 ?? (
                                <p
                                    id="1004_170656"
                                    className="Pixso-paragraph-1004_170656 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170657 ?? (
                                <Switch0
                                    id="1004_170657"
                                    className="Pixso-instance-1004_170657"
                                    type={type_1004_170657}
                                    transitionConfig={
                                        transitionConfig1004_170657
                                    }
                                    click={click_1004_170657}
                                ></Switch0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1004_170658"
                            className="Pixso-symbol-1004_170658"
                        >
                            {slot_1004_170659 ?? (
                                <p
                                    id="1004_170659"
                                    className="Pixso-paragraph-1004_170659 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170660 ?? (
                                <p
                                    id="1004_170660"
                                    className="Pixso-paragraph-1004_170660 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1004_170661"
                            className="Pixso-symbol-1004_170661"
                        >
                            {slot_1004_170662 ?? (
                                <p
                                    id="1004_170662"
                                    className="Pixso-paragraph-1004_170662 text-medium16-1004_170482"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1004_170663 ?? (
                                <p
                                    id="1004_170663"
                                    className="Pixso-paragraph-1004_170663 text-regular14-504_2349"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
};
export default Celltitle;
