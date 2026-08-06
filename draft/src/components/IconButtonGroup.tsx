import ButtonIcon1 from "@/components/Buttonicon1";
import { useState } from "react";
import ButtonIconnogreendefaultmediumdefault0 from "@/components/Buttoniconnogreendefaultmediumdefault0";
import ButtonIconnopurpledefaultmediumdefault0 from "@/components/Buttoniconnopurpledefaultmediumdefault0";
import ButtonIconyesbluedefaultmediumdefault0 from "@/components/Buttoniconyesbluedefaultmediumdefault0";
import ButtonIconyesgreendefaultmediumdefault0 from "@/components/Buttoniconyesgreendefaultmediumdefault0";
import ButtonIconyesdefaultmediumdefault0 from "@/components/Buttoniconyesdefaultmediumdefault0";
import "@/styles/IconButtonGroup.css";
interface IconButtonGroupProps {
    visible_2600829227_1511658972?: boolean;
    visible_2850472941_3924155206?: boolean;
    visible_4110858886_3778584558?: boolean;
    count?: string;
    dark_mode?: string;
    theme?: string;
    id?: string;
    className?: string;
    slot_1057_170204?: React.ReactNode;
    slot_1057_170206?: React.ReactNode;
    slot_1057_170208?: React.ReactNode;
    slot_1057_170210?: React.ReactNode;
    slot_1057_170211?: React.ReactNode;
    slot_1057_170213?: React.ReactNode;
    slot_1057_170214?: React.ReactNode;
    slot_1057_170216?: React.ReactNode;
    slot_1057_170217?: React.ReactNode;
    slot_1057_170219?: React.ReactNode;
    slot_1057_170220?: React.ReactNode;
    slot_1057_170221?: React.ReactNode;
    slot_1057_170223?: React.ReactNode;
    slot_1057_170224?: React.ReactNode;
    slot_1057_170225?: React.ReactNode;
    slot_1057_170227?: React.ReactNode;
    slot_1057_170228?: React.ReactNode;
    slot_1057_170229?: React.ReactNode;
    slot_1057_170231?: React.ReactNode;
    slot_1057_170232?: React.ReactNode;
    slot_1057_170233?: React.ReactNode;
    slot_1057_170234?: React.ReactNode;
    slot_1057_170236?: React.ReactNode;
    slot_1057_170237?: React.ReactNode;
    slot_1057_170238?: React.ReactNode;
    slot_1057_170239?: React.ReactNode;
    slot_1057_170241?: React.ReactNode;
    slot_1057_170242?: React.ReactNode;
    slot_1057_170243?: React.ReactNode;
    slot_1057_170244?: React.ReactNode;
    slot_1057_170246?: React.ReactNode;
    slot_1057_170248?: React.ReactNode;
    slot_1057_170250?: React.ReactNode;
    slot_1057_170252?: React.ReactNode;
    slot_1057_170253?: React.ReactNode;
    slot_1057_170255?: React.ReactNode;
    slot_1057_170256?: React.ReactNode;
    slot_1057_170258?: React.ReactNode;
    slot_1057_170259?: React.ReactNode;
    slot_1057_170261?: React.ReactNode;
    slot_1057_170262?: React.ReactNode;
    slot_1057_170263?: React.ReactNode;
    slot_1057_170265?: React.ReactNode;
    slot_1057_170266?: React.ReactNode;
    slot_1057_170267?: React.ReactNode;
    slot_1057_170269?: React.ReactNode;
    slot_1057_170270?: React.ReactNode;
    slot_1057_170271?: React.ReactNode;
    slot_1057_170273?: React.ReactNode;
    slot_1057_170274?: React.ReactNode;
    slot_1057_170275?: React.ReactNode;
    slot_1057_170276?: React.ReactNode;
    slot_1057_170278?: React.ReactNode;
    slot_1057_170279?: React.ReactNode;
    slot_1057_170280?: React.ReactNode;
    slot_1057_170281?: React.ReactNode;
    slot_1057_170283?: React.ReactNode;
    slot_1057_170284?: React.ReactNode;
    slot_1057_170285?: React.ReactNode;
    slot_1057_170286?: React.ReactNode;
}
const IconButtonGroup = (props: IconButtonGroupProps) => {
    const {
        visible_2600829227_1511658972 = true,
        visible_2850472941_3924155206 = true,
        visible_4110858886_3778584558 = true,
        count,
        dark_mode,
        theme,
        id,
        className = "",
        slot_1057_170204,
        slot_1057_170206,
        slot_1057_170208,
        slot_1057_170210,
        slot_1057_170211,
        slot_1057_170213,
        slot_1057_170214,
        slot_1057_170216,
        slot_1057_170217,
        slot_1057_170219,
        slot_1057_170220,
        slot_1057_170221,
        slot_1057_170223,
        slot_1057_170224,
        slot_1057_170225,
        slot_1057_170227,
        slot_1057_170228,
        slot_1057_170229,
        slot_1057_170231,
        slot_1057_170232,
        slot_1057_170233,
        slot_1057_170234,
        slot_1057_170236,
        slot_1057_170237,
        slot_1057_170238,
        slot_1057_170239,
        slot_1057_170241,
        slot_1057_170242,
        slot_1057_170243,
        slot_1057_170244,
        slot_1057_170246,
        slot_1057_170248,
        slot_1057_170250,
        slot_1057_170252,
        slot_1057_170253,
        slot_1057_170255,
        slot_1057_170256,
        slot_1057_170258,
        slot_1057_170259,
        slot_1057_170261,
        slot_1057_170262,
        slot_1057_170263,
        slot_1057_170265,
        slot_1057_170266,
        slot_1057_170267,
        slot_1057_170269,
        slot_1057_170270,
        slot_1057_170271,
        slot_1057_170273,
        slot_1057_170274,
        slot_1057_170275,
        slot_1057_170276,
        slot_1057_170278,
        slot_1057_170279,
        slot_1057_170280,
        slot_1057_170281,
        slot_1057_170283,
        slot_1057_170284,
        slot_1057_170285,
        slot_1057_170286
    } = props;

    const [type_1057_170204, setType_1057_170204] = useState("default");
    const [size_1057_170204, setSize_1057_170204] = useState("medium");
    const [state_1057_170204, setState_1057_170204] = useState("default");
    const [type_1057_170210, setType_1057_170210] = useState("default");
    const [size_1057_170210, setSize_1057_170210] = useState("medium");
    const [state_1057_170210, setState_1057_170210] = useState("default");
    const [type_1057_170211, setType_1057_170211] = useState("default");
    const [size_1057_170211, setSize_1057_170211] = useState("medium");
    const [state_1057_170211, setState_1057_170211] = useState("default");
    const [type_1057_170219, setType_1057_170219] = useState("default");
    const [size_1057_170219, setSize_1057_170219] = useState("medium");
    const [state_1057_170219, setState_1057_170219] = useState("default");
    const [type_1057_170220, setType_1057_170220] = useState("default");
    const [size_1057_170220, setSize_1057_170220] = useState("medium");
    const [state_1057_170220, setState_1057_170220] = useState("default");
    const [type_1057_170221, setType_1057_170221] = useState("default");
    const [size_1057_170221, setSize_1057_170221] = useState("medium");
    const [state_1057_170221, setState_1057_170221] = useState("default");
    const [type_1057_170231, setType_1057_170231] = useState("default");
    const [size_1057_170231, setSize_1057_170231] = useState("medium");
    const [state_1057_170231, setState_1057_170231] = useState("default");
    const [type_1057_170232, setType_1057_170232] = useState("default");
    const [size_1057_170232, setSize_1057_170232] = useState("medium");
    const [state_1057_170232, setState_1057_170232] = useState("default");
    const [type_1057_170233, setType_1057_170233] = useState("default");
    const [size_1057_170233, setSize_1057_170233] = useState("medium");
    const [state_1057_170233, setState_1057_170233] = useState("default");
    const [type_1057_170234, setType_1057_170234] = useState("default");
    const [size_1057_170234, setSize_1057_170234] = useState("medium");
    const [state_1057_170234, setState_1057_170234] = useState("default");
    const [transitionConfig1057_170204, setTransitionConfig1057_170204] =
        useState({});
    const [transitionConfig1057_170210, setTransitionConfig1057_170210] =
        useState({});
    const [transitionConfig1057_170211, setTransitionConfig1057_170211] =
        useState({});
    const [transitionConfig1057_170219, setTransitionConfig1057_170219] =
        useState({});
    const [transitionConfig1057_170220, setTransitionConfig1057_170220] =
        useState({});
    const [transitionConfig1057_170221, setTransitionConfig1057_170221] =
        useState({});
    const [transitionConfig1057_170231, setTransitionConfig1057_170231] =
        useState({});
    const [transitionConfig1057_170232, setTransitionConfig1057_170232] =
        useState({});
    const [transitionConfig1057_170233, setTransitionConfig1057_170233] =
        useState({});
    const [transitionConfig1057_170234, setTransitionConfig1057_170234] =
        useState({});
    const transitionConfig: any = {
        "1057:170234_978:1561_mo": {
            transition: { duration: 0, ease: [0, 0, 1, 1] }
        }
    };

    const mouseover_1057_170204 = () => {
        setType_1057_170204("default");
        setSize_1057_170204("medium");
        setState_1057_170204("hover");
    };

    const mouseover_1057_170210 = () => {
        setType_1057_170210("default");
        setSize_1057_170210("medium");
        setState_1057_170210("hover");
    };

    const mouseover_1057_170211 = () => {
        setType_1057_170211("default");
        setSize_1057_170211("medium");
        setState_1057_170211("hover");
    };

    const mouseover_1057_170219 = () => {
        setType_1057_170219("default");
        setSize_1057_170219("medium");
        setState_1057_170219("hover");
    };

    const mouseover_1057_170220 = () => {
        setType_1057_170220("default");
        setSize_1057_170220("medium");
        setState_1057_170220("hover");
    };

    const mouseover_1057_170221 = () => {
        setType_1057_170221("default");
        setSize_1057_170221("medium");
        setState_1057_170221("hover");
    };

    const mouseover_1057_170231 = () => {
        setType_1057_170231("default");
        setSize_1057_170231("medium");
        setState_1057_170231("hover");
    };

    const mouseover_1057_170232 = () => {
        setType_1057_170232("default");
        setSize_1057_170232("medium");
        setState_1057_170232("hover");
    };

    const mouseover_1057_170233 = () => {
        setType_1057_170233("default");
        setSize_1057_170233("medium");
        setState_1057_170233("hover");
    };

    const mouseover_1057_170234 = () => {
        setType_1057_170234("default");
        setSize_1057_170234("medium");
        setState_1057_170234("hover");
    };

    return (
        <div
            className={["component-1057_170202", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_170202" className="Pixso-symbol-1057_170202">
                {count === "1" && dark_mode === "false" && theme === "blue" && (
                    <div id="1057_170203" className="Pixso-symbol-1057_170203">
                        {slot_1057_170204 ?? (
                            <ButtonIcon1
                                id="1057_170204"
                                className="Pixso-instance-1057_170204"
                                type={type_1057_170204}
                                size={size_1057_170204}
                                state={state_1057_170204}
                                transitionConfig={transitionConfig1057_170204}
                                mouseover={mouseover_1057_170204}
                            ></ButtonIcon1>
                        )}
                    </div>
                )}
                {count === "1" &&
                    dark_mode === "false" &&
                    theme === "green" && (
                        <div
                            id="1057_170205"
                            className="Pixso-symbol-1057_170205"
                        >
                            {slot_1057_170206 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170206"
                                    className="Pixso-instance-1057_170206"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "1" &&
                    dark_mode === "false" &&
                    theme === "purple" && (
                        <div
                            id="1057_170207"
                            className="Pixso-symbol-1057_170207"
                        >
                            {slot_1057_170208 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170208"
                                    className="Pixso-instance-1057_170208"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "2" && dark_mode === "false" && theme === "blue" && (
                    <div id="1057_170209" className="Pixso-symbol-1057_170209">
                        {slot_1057_170210 ?? (
                            <ButtonIcon1
                                id="1057_170210"
                                className="Pixso-instance-1057_170210"
                                type={type_1057_170210}
                                size={size_1057_170210}
                                state={state_1057_170210}
                                transitionConfig={transitionConfig1057_170210}
                                mouseover={mouseover_1057_170210}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170211 ?? (
                            <ButtonIcon1
                                id="1057_170211"
                                className="Pixso-instance-1057_170211"
                                type={type_1057_170211}
                                size={size_1057_170211}
                                state={state_1057_170211}
                                transitionConfig={transitionConfig1057_170211}
                                mouseover={mouseover_1057_170211}
                            ></ButtonIcon1>
                        )}
                    </div>
                )}
                {count === "2" &&
                    dark_mode === "false" &&
                    theme === "green" && (
                        <div
                            id="1057_170212"
                            className="Pixso-symbol-1057_170212"
                        >
                            {slot_1057_170213 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170213"
                                    className="Pixso-instance-1057_170213"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170214 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170214"
                                    className="Pixso-instance-1057_170214"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "2" &&
                    dark_mode === "false" &&
                    theme === "purple" && (
                        <div
                            id="1057_170215"
                            className="Pixso-symbol-1057_170215"
                        >
                            {slot_1057_170216 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170216"
                                    className="Pixso-instance-1057_170216"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170217 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170217"
                                    className="Pixso-instance-1057_170217"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "3" && dark_mode === "false" && theme === "blue" && (
                    <div id="1057_170218" className="Pixso-symbol-1057_170218">
                        {slot_1057_170219 ?? (
                            <ButtonIcon1
                                id="1057_170219"
                                className="Pixso-instance-1057_170219"
                                type={type_1057_170219}
                                size={size_1057_170219}
                                state={state_1057_170219}
                                transitionConfig={transitionConfig1057_170219}
                                mouseover={mouseover_1057_170219}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170220 ?? (
                            <ButtonIcon1
                                id="1057_170220"
                                className="Pixso-instance-1057_170220"
                                type={type_1057_170220}
                                size={size_1057_170220}
                                state={state_1057_170220}
                                transitionConfig={transitionConfig1057_170220}
                                mouseover={mouseover_1057_170220}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170221 ?? (
                            <ButtonIcon1
                                id="1057_170221"
                                className="Pixso-instance-1057_170221"
                                type={type_1057_170221}
                                size={size_1057_170221}
                                state={state_1057_170221}
                                transitionConfig={transitionConfig1057_170221}
                                mouseover={mouseover_1057_170221}
                            ></ButtonIcon1>
                        )}
                    </div>
                )}
                {count === "3" &&
                    dark_mode === "false" &&
                    theme === "green" && (
                        <div
                            id="1057_170222"
                            className="Pixso-symbol-1057_170222"
                        >
                            {slot_1057_170223 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170223"
                                    className="Pixso-instance-1057_170223"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170224 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170224"
                                    className="Pixso-instance-1057_170224"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170225 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170225"
                                    className="Pixso-instance-1057_170225"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "3" &&
                    dark_mode === "false" &&
                    theme === "purple" && (
                        <div
                            id="1057_170226"
                            className="Pixso-symbol-1057_170226"
                        >
                            {slot_1057_170227 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170227"
                                    className="Pixso-instance-1057_170227"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170228 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170228"
                                    className="Pixso-instance-1057_170228"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170229 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170229"
                                    className="Pixso-instance-1057_170229"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "4" && dark_mode === "false" && theme === "blue" && (
                    <div id="1057_170230" className="Pixso-symbol-1057_170230">
                        {slot_1057_170231 ?? (
                            <ButtonIcon1
                                id="1057_170231"
                                className="Pixso-instance-1057_170231"
                                type={type_1057_170231}
                                size={size_1057_170231}
                                state={state_1057_170231}
                                transitionConfig={transitionConfig1057_170231}
                                mouseover={mouseover_1057_170231}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170232 ?? (
                            <ButtonIcon1
                                id="1057_170232"
                                className="Pixso-instance-1057_170232"
                                type={type_1057_170232}
                                size={size_1057_170232}
                                state={state_1057_170232}
                                transitionConfig={transitionConfig1057_170232}
                                mouseover={mouseover_1057_170232}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170233 ?? (
                            <ButtonIcon1
                                id="1057_170233"
                                className="Pixso-instance-1057_170233"
                                type={type_1057_170233}
                                size={size_1057_170233}
                                state={state_1057_170233}
                                transitionConfig={transitionConfig1057_170233}
                                mouseover={mouseover_1057_170233}
                            ></ButtonIcon1>
                        )}
                        {slot_1057_170234 ?? (
                            <ButtonIcon1
                                id="1057_170234"
                                className="Pixso-instance-1057_170234"
                                type={type_1057_170234}
                                size={size_1057_170234}
                                state={state_1057_170234}
                                transitionConfig={transitionConfig1057_170234}
                                mouseover={mouseover_1057_170234}
                            ></ButtonIcon1>
                        )}
                    </div>
                )}
                {count === "4" &&
                    dark_mode === "false" &&
                    theme === "green" && (
                        <div
                            id="1057_170235"
                            className="Pixso-symbol-1057_170235"
                        >
                            {slot_1057_170236 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170236"
                                    className="Pixso-instance-1057_170236"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170237 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170237"
                                    className="Pixso-instance-1057_170237"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170238 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170238"
                                    className="Pixso-instance-1057_170238"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                            {slot_1057_170239 ?? (
                                <ButtonIconnogreendefaultmediumdefault0
                                    id="1057_170239"
                                    className="Pixso-instance-1057_170239"
                                ></ButtonIconnogreendefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "4" &&
                    dark_mode === "false" &&
                    theme === "purple" && (
                        <div
                            id="1057_170240"
                            className="Pixso-symbol-1057_170240"
                        >
                            {slot_1057_170241 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170241"
                                    className="Pixso-instance-1057_170241"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170242 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170242"
                                    className="Pixso-instance-1057_170242"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170243 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170243"
                                    className="Pixso-instance-1057_170243"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                            {slot_1057_170244 ?? (
                                <ButtonIconnopurpledefaultmediumdefault0
                                    id="1057_170244"
                                    className="Pixso-instance-1057_170244"
                                ></ButtonIconnopurpledefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "1" && dark_mode === "true" && theme === "blue" && (
                    <div id="1057_170245" className="Pixso-symbol-1057_170245">
                        {slot_1057_170246 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170246"
                                className="Pixso-instance-1057_170246"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "1" && dark_mode === "true" && theme === "green" && (
                    <div id="1057_170247" className="Pixso-symbol-1057_170247">
                        {slot_1057_170248 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170248"
                                className="Pixso-instance-1057_170248"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "1" &&
                    dark_mode === "true" &&
                    theme === "purple" && (
                        <div
                            id="1057_170249"
                            className="Pixso-symbol-1057_170249"
                        >
                            {slot_1057_170250 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170250"
                                    className="Pixso-instance-1057_170250"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "2" && dark_mode === "true" && theme === "blue" && (
                    <div id="1057_170251" className="Pixso-symbol-1057_170251">
                        {slot_1057_170252 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170252"
                                className="Pixso-instance-1057_170252"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170253 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170253"
                                className="Pixso-instance-1057_170253"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "2" && dark_mode === "true" && theme === "green" && (
                    <div id="1057_170254" className="Pixso-symbol-1057_170254">
                        {slot_1057_170255 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170255"
                                className="Pixso-instance-1057_170255"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170256 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170256"
                                className="Pixso-instance-1057_170256"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "2" &&
                    dark_mode === "true" &&
                    theme === "purple" && (
                        <div
                            id="1057_170257"
                            className="Pixso-symbol-1057_170257"
                        >
                            {slot_1057_170258 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170258"
                                    className="Pixso-instance-1057_170258"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170259 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170259"
                                    className="Pixso-instance-1057_170259"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "3" && dark_mode === "true" && theme === "blue" && (
                    <div id="1057_170260" className="Pixso-symbol-1057_170260">
                        {slot_1057_170261 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170261"
                                className="Pixso-instance-1057_170261"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170262 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170262"
                                className="Pixso-instance-1057_170262"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170263 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170263"
                                className="Pixso-instance-1057_170263"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "3" && dark_mode === "true" && theme === "green" && (
                    <div id="1057_170264" className="Pixso-symbol-1057_170264">
                        {slot_1057_170265 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170265"
                                className="Pixso-instance-1057_170265"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170266 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170266"
                                className="Pixso-instance-1057_170266"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170267 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170267"
                                className="Pixso-instance-1057_170267"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "3" &&
                    dark_mode === "true" &&
                    theme === "purple" && (
                        <div
                            id="1057_170268"
                            className="Pixso-symbol-1057_170268"
                        >
                            {slot_1057_170269 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170269"
                                    className="Pixso-instance-1057_170269"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170270 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170270"
                                    className="Pixso-instance-1057_170270"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170271 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170271"
                                    className="Pixso-instance-1057_170271"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                        </div>
                    )}
                {count === "4" && dark_mode === "true" && theme === "blue" && (
                    <div id="1057_170272" className="Pixso-symbol-1057_170272">
                        {slot_1057_170273 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170273"
                                className="Pixso-instance-1057_170273"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170274 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170274"
                                className="Pixso-instance-1057_170274"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170275 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170275"
                                className="Pixso-instance-1057_170275"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                        {slot_1057_170276 ?? (
                            <ButtonIconyesbluedefaultmediumdefault0
                                id="1057_170276"
                                className="Pixso-instance-1057_170276"
                            ></ButtonIconyesbluedefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "4" && dark_mode === "true" && theme === "green" && (
                    <div id="1057_170277" className="Pixso-symbol-1057_170277">
                        {slot_1057_170278 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170278"
                                className="Pixso-instance-1057_170278"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170279 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170279"
                                className="Pixso-instance-1057_170279"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170280 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170280"
                                className="Pixso-instance-1057_170280"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                        {slot_1057_170281 ?? (
                            <ButtonIconyesgreendefaultmediumdefault0
                                id="1057_170281"
                                className="Pixso-instance-1057_170281"
                            ></ButtonIconyesgreendefaultmediumdefault0>
                        )}
                    </div>
                )}
                {count === "4" &&
                    dark_mode === "true" &&
                    theme === "purple" && (
                        <div
                            id="1057_170282"
                            className="Pixso-symbol-1057_170282"
                        >
                            {slot_1057_170283 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170283"
                                    className="Pixso-instance-1057_170283"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170284 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170284"
                                    className="Pixso-instance-1057_170284"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170285 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170285"
                                    className="Pixso-instance-1057_170285"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                            {slot_1057_170286 ?? (
                                <ButtonIconyesdefaultmediumdefault0
                                    id="1057_170286"
                                    className="Pixso-instance-1057_170286"
                                ></ButtonIconyesdefaultmediumdefault0>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
};
export default IconButtonGroup;
