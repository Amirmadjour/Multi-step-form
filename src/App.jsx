import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./fonts.css";
import { useSelector, useDispatch } from "react-redux";
import { selectToggled, toggle } from "./appStates/mo_yrSlice.js";
import { selectSum, addSum, setSum } from "./appStates/sumSlice.js";
import iconAdvancedSVG from "../resources/images/icon-advanced.svg";
import iconArcadeSVG from "../resources/images/icon-arcade.svg";
import iconProdSVG from "../resources/images/icon-pro.svg";
import iconCheckmarkSVG from "../resources/images/icon-checkmark.svg";
import iconThankYouSVG from "../resources/images/icon-thank-you.svg";
import {
  selectedAddon,
  addAddon,
  removeAddon,
  replacePrice,
} from "./appStates/add_onsSlice.js";
import { selectedChecked, toggleChecked } from "./appStates/isCheckedSlice.js";
import { selectPlan, changeSelectedPlan } from "./appStates/selectedButton.js";
import {
  selectStepCounter,
  handleNextStep,
  handlePreviousStep,
  handleChange,
} from "./appStates/step_counterSlice.js";
import {
  selectFormSubmission,
  submit_form,
  setSbm,
} from "./appStates/form_submitted.js";

function App() {
  return (
    <>
      <Mainwindow />
    </>
  );
}

function Mainwindow() {
  return (
    <div className="mainwindow">
      <Sidebar steps />
      <Multi_step_form />
    </div>
  );
}

function Sidebar(props) {
  const steps = useSelector(selectStepCounter);
  return (
    <div className="sidebar">
      <div className="info-bar">
        <Barstep
          className={
            steps === 1 ? "step-container step-activated" : "step-container"
          }
          number="1"
          info="YOUR INFO"
        ></Barstep>
        <Barstep
          className={
            steps === 2 ? "step-container step-activated" : "step-container"
          }
          number="2"
          info="SELECT PLAN"
        ></Barstep>
        <Barstep
          className={
            steps === 3 ? "step-container step-activated" : "step-container"
          }
          number="3"
          info="ADD-ONS"
        ></Barstep>
        <Barstep
          className={
            steps >= 4 ? "step-container step-activated" : "step-container"
          }
          number="4"
          info="SUMMERY"
        ></Barstep>
      </div>
    </div>
  );
}

function Barstep(props) {
  return (
    <div className={props.className}>
      <p>{props.number}</p>
      <div className="step-info-container">
        <p>STEP {props.number}</p>
        <p className="props-info">{props.info}</p>
      </div>
    </div>
  );
}

function Multi_step_form() {
  const step = useSelector(selectStepCounter);
  const form_sbm = useSelector(selectFormSubmission);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const Next_confirm = step === 4 ? "Confirm" : "Next Step";
  const Next_class_name = step === 4 ? "Purple" : "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (form_sbm) {
      dispatch(setSbm());
    }
  }, []);

  return (
    <>
      {step <= 4 && !form_sbm && (
        <form>
          {step === 1 && (
            <Step1 formData={formData} handleInputChange={handleInputChange} />
          )}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step !== 1 && (
            <button
              className={Next_class_name}
              onClick={(e) => {
                if (step < 4) {
                  e.preventDefault();
                  dispatch(handleNextStep());
                } else {
                  dispatch(submit_form());
                  setTimeout(() => {
                    window.location.reload();
                    dispatch(submit_form());
                  }, 2000);
                }
              }}
            >
              {Next_confirm}
            </button>
          )}

          {step !== 1 && (
            <button
              className="previous_button"
              onClick={(e) => {
                dispatch(handlePreviousStep());
                e.preventDefault();
              }}
            >
              Previous
            </button>
          )}
        </form>
      )}
      {form_sbm && <ThankYouStep />}
    </>
  );
}

function Step1({ formData, handleInputChange }) {
  const dispatch = useDispatch();
  const [filled, setFilled] = useState(null);
  const handleCheckFields = () => {
    if (!formData.name.trim()) {
      setFilled(1);
    } else if (!formData.email.trim()) {
      setFilled(2);
    } else if (!formData.phone.trim()) {
      setFilled(3);
    } else {
      dispatch(handleNextStep());
    }
  };

  return (
    <div className="step_form form_step_one">
      <h2 className="personal_info">Personal info</h2>
      <p>Please provide your name, email and phone number.</p>
      <label htmlFor="name">Name</label>
      {filled === 1 && !formData.name.trim() && (
        <p className="required_phrase">This field is required</p>
      )}
      <input
        className={filled === 1 && !formData.name.trim() ? "required" : ""}
        type="text"
        placeholder="e.g. Amar Mansour"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleInputChange}
        autoComplete="off"
        required
      ></input>
      <label htmlFor="email">Email Address</label>
      {filled === 2 && !formData.email.trim() && (
        <p className="required_phrase">This field is required</p>
      )}
      <input
        className={filled === 2 && !formData.email.trim() ? "required" : ""}
        type="text"
        placeholder="e.g. someting10@gmail.com"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        autoComplete="off"
        required
      ></input>
      <label htmlFor="phone">Phone Number</label>
      {filled === 3 && !formData.phone.trim() && (
        <p className="required_phrase">This field is required</p>
      )}
      <input
        className={filled === 3 && !formData.phone.trim() ? "required" : ""}
        type="text"
        placeholder="e.g. 0512345678"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleInputChange}
        autoComplete="off"
        required
      ></input>
      <button type="button" onClick={handleCheckFields}>
        Next Step
      </button>
    </div>
  );
}

const PlanButtons = () => {
  const toggled = useSelector(selectToggled);
  const dispatch = useDispatch();
  const Plan = useSelector(selectPlan);

  return (
    <div>
      <div className="planbuttons">
        <button
          type="button"
          onClick={() => dispatch(changeSelectedPlan("Arcade"))}
          style={{
            background: Plan === "Arcade" ? "hsl(217, 100%, 97%)" : "",
            borderColor: Plan === "Arcade" ? "hsl(243, 100%, 62%)" : "",
          }}
        >
          <img src={iconArcadeSVG} />
          <p>Arcade</p>
          <p className="plan_price">{toggled ? "$90/yr" : "$9/mo"}</p>
          <p className="months-free">{toggled ? "2 months free": ""}</p>
        </button>
        <button
          type="button"
          onClick={() => dispatch(changeSelectedPlan("Advanced"))}
          style={{
            background: Plan === "Advanced" ? "hsl(217, 100%, 97%)" : "",
            borderColor: Plan === "Advanced" ? "hsl(243, 100%, 62%)" : "",
          }}
        >
          <img src={iconAdvancedSVG} />
          <p>Advanced</p>
          <p className="plan_price">{toggled ? "$120/yr" : "$12/mo"}</p>
          <p className="months-free">{toggled ? "2 months free": ""}</p>
        </button>
        <button
          type="button"
          onClick={() => dispatch(changeSelectedPlan("Pro"))}
          style={{
            background: Plan === "Pro" ? "hsl(217, 100%, 97%)" : "",
            borderColor: Plan === "Pro" ? "hsl(243, 100%, 62%)" : "",
          }}
        >
          <img src={iconProdSVG} />
          <p>Pro</p>
          <p className="plan_price">{toggled ? "$150/yr" : "$15/mo"}</p>
          <p className="months-free">{toggled ? "2 months free": ""}</p>
        </button>
      </div>
      <div
        style={{ color: toggled ? "hsl(231, 11%, 63%)" : "hsl(213, 96%, 18%)" }}
        className="toggle"
      >
        <p>Monthly</p>
        <button
          type="button"
          onClick={() => dispatch(toggle())}
          className="toggle_button"
        >
          <div style={{ left: toggled ? "22px" : "2px" }}></div>
        </button>
        <p
          style={{
            color: !toggled ? "hsl(231, 11%, 63%)" : "hsl(213, 96%, 18%)",
          }}
        >
          Yearly
        </p>
      </div>
    </div>
  );
};

function Step2() {
  return (
    <div className="step_form">
      <h2>Select you plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
      <PlanButtons />
    </div>
  );
}

function CheckBox(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.checked) {
      dispatch(addAddon({ title: props.title, price: props.price }));
    } else {
      dispatch(removeAddon({ title: props.title }));
    }
  }, [props.checked]);

  useEffect(() => {
    dispatch(replacePrice({ title: props.title, price: props.price }));
  }, [props.price]);

  return (
    <label className={props.checked ? "checkbox checkbox_active" : "checkbox"}>
      <input
        checked={props.checked}
        onChange={() => dispatch(toggleChecked(props.index))}
        type="checkbox"
        id={props.id}
      ></input>
      <img src={iconCheckmarkSVG} />
      <div>
        <p>{props.title}</p>
        <p>{props.description}</p>
      </div>
      <p>{props.price}</p>
    </label>
  );
}

function Step3() {
  const toggled = useSelector(selectToggled);
  const isChecked = useSelector(selectedChecked);

  return (
    <div className="step_form step3">
      <h2>Pick add-ons</h2>
      <p>Add-ons help inhance your gaming experience.</p>
      <CheckBox
        checked={isChecked[0]}
        index={0}
        id="online_services"
        title="Online services"
        description="Access to multiplayer games"
        price={toggled ? "+$10/yr" : "+$1/mo"}
      />
      <CheckBox
        checked={isChecked[1]}
        index={1}
        id="larger_storage"
        title="Larger storage"
        description="Extra 1TB of cloud save"
        price={toggled ? "+$20/yr" : "+$2/mo"}
      />
      <CheckBox
        checked={isChecked[2]}
        index={2}
        id="customizable_profile"
        title="Customizable profile"
        description="Custom theme on your profile"
        price={toggled ? "+$20/yr" : "+$2/mo"}
      />
    </div>
  );
}

function Step4() {
  const sum = useSelector(selectSum);
  const [planPrice, setPlanPrice] = useState(0);
  const toggled = useSelector(selectToggled);
  const Plan = useSelector(selectPlan);
  const addons = useSelector(selectedAddon);
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (toggled) {
        if (Plan === "Arcade") {
          dispatch(setSum(90));
          setPlanPrice(90);
        } else if (Plan === "Advanced") {
          dispatch(setSum(120));
          setPlanPrice(120);
        } else {
          dispatch(setSum(150));
          setPlanPrice(150);
        }
        addons.map((addon) => {
          dispatch(addSum(parseInt(addon.price.substring(2, 4), 10)));
        });
      } else {
        if (Plan === "Arcade") {
          dispatch(setSum(9));
          setPlanPrice(9);
        } else if (Plan === "Advanced") {
          dispatch(setSum(12));
          setPlanPrice(12);
        } else {
          dispatch(setSum(15));
          setPlanPrice(15);
        }
        addons.map((addon) => {
          dispatch(addSum(parseInt(addon.price.substring(2, 3), 10)));
        });
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [toggled, addons]);

  return (
    <div className="step_form">
      <h2>Finishing up</h2>
      <p>Double-check everything looks OK before confirming.</p>
      <div className="plan-showOff">
        <div className="plan-showOff-header">
          <div>
            <div>
              {Plan}
              {toggled ? " (Yearly)" : " (Monthly)"}
            </div>
            <div>
              <button
                className="plan-showOff-button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(handleChange());
                }}
              >
                Change
              </button>
            </div>
          </div>
          <div>
            ${planPrice}
            {toggled ? "/yr" : "/mo"}
          </div>
        </div>
        <div className="plan-showOff-line"></div>
        <div className="list-addons">
          {addons.map((addon) => (
            <div
              className="plan-showOff-addons"
              key={`${addon.title}-${addon.price}`}
            >
              <p>{addon.title}</p>
              <p>{addon.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="total">
        <p>Total (per {toggled ? "year" : "month"})</p>
        <div>
          ${sum}/{toggled ? "yr" : "mo"}
        </div>
      </div>
    </div>
  );
}

function ThankYouStep() {
  return (
    <div className="thank-you">
      <div>
        <img src={iconThankYouSVG}></img>
        <p>Thank You!</p>
        <p>
          Thanks for confirming your subscribtion! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com
        </p>
      </div>
    </div>
  );
}
export default App;
