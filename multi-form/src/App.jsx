import React, { useState } from "react";
import "./App.css";
import "./fonts.css";
import iconAdvancedSVG from "../resources/images/icon-advanced.svg";
import iconArcadeSVG from "../resources/images/icon-arcade.svg";
import iconProdSVG from "../resources/images/icon-pro.svg";

function App() {
  return (
    <>
      <Mainwindow />
    </>
  );
}

function Mainwindow() {
  const [step, setStep] = useState(1);

  const determineStep = (value) => {
    setStep(value);
  };

  return (
    <div className="mainwindow">
      <Sidebar steps={step} />
      <Multi_step_form callBack={determineStep} />
    </div>
  );
}

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="info-bar">
        <Barstep
          className={
            props.steps === 1
              ? "step-container step-activated"
              : "step-container"
          }
          number="1"
          info="YOUR INFO"
        ></Barstep>
        <Barstep
          className={
            props.steps === 2
              ? "step-container step-activated"
              : "step-container"
          }
          number="2"
          info="SELECT PLAN"
        ></Barstep>
        <Barstep
          className={
            props.steps === 3
              ? "step-container step-activated"
              : "step-container"
          }
          number="3"
          info="ADD-ONS"
        ></Barstep>
        <Barstep
          className={
            props.steps === 4
              ? "step-container step-activated"
              : "step-container"
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

function Multi_step_form({ callBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: "",
  });

  const Next_confirm = step === 4 ? "Confirm" : "Next Step";
  const Next_class_name = step === 4 ? "Purple" : "";

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
    callBack(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
    callBack(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form>
        {step === 1 && (
          <Step1 formData={formData} handleInputChange={handleInputChange} />
        )}
        {step === 2 && (
          <Step2 formData={formData} handleInputChange={handleInputChange} />
        )}
        {step === 3 && (
          <Step3 formData={formData} handleInputChange={handleInputChange} />
        )}
        {step === 4 && (
          <Step4 formData={formData} handleInputChange={handleInputChange} />
        )}
        <button className={Next_class_name} onClick={handleNext}>
          {Next_confirm}
        </button>
        {step !== 1 && (
          <button className="previous_button" onClick={handlePrevious}>
            Previous
          </button>
        )}
      </form>
    </>
  );
}

function Step1({ formData, handleInputChange }) {
  return (
    <div className="step_form form_step_one">
      <h2 className="personal_info">Personal info</h2>
      <p>Please provide your name, email and phone number.</p>
      <label htmlFor="name">Name</label>
      <input
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
      <input
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
      <input
        type="text"
        placeholder="e.g. 0512345678"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleInputChange}
        autoComplete="off"
        required
      ></input>
    </div>
  );
}

const PlanButtons = ({ onChange }) => {
  const [selectedButton, setSelectedButton] = useState("Arcade");
  const [toggle, setToggle] = useState(false);

  const handleButtonClicked = (value) => {
    setSelectedButton(value);

    if (onChange) {
      onChange(value);
    }
  };

  const handletoggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="planbuttons">
        <button
          type="button"
          onClick={() => handleButtonClicked("Arcade")}
          style={{
            background:
              selectedButton === "Arcade" ? "hsl(217, 100%, 97%)" : "",
          }}
        >
          <img src={iconArcadeSVG} />
          <p>Arcade</p>
          <p>{ toggle ? "$90/yr" : "$9/mo"}</p>
        </button>
        <button
          type="button"
          onClick={() => handleButtonClicked("Advanced")}
          style={{
            background:
              selectedButton === "Advanced" ? "hsl(217, 100%, 97%)" : "",
          }}
        >
          <img src={iconAdvancedSVG} />
          <p>Advanced</p>
          <p>{ toggle ? "$120/yr" : "$12/mo"}</p>
        </button>
        <button
          type="button"
          onClick={() => handleButtonClicked("Pro")}
          style={{
            background: selectedButton === "Pro" ? "hsl(217, 100%, 97%)" : "",
          }}
        >
          <img src={iconProdSVG} />
          <p>Pro</p>
          <p>{ toggle ? "$150/yr" : "$15/mo"}</p>
        </button>
      </div>
      <div 
        style={{ color: toggle ? "hsl(231, 11%, 63%)" : "hsl(213, 96%, 18%)" }}
        className="toggle"
      >
        <p>Monthly</p>
        <button
          type="button"
          onClick={handletoggle}
          className="toggle_button"
        ><div style={{ left: toggle ? "22px" : "2px"}}></div></button>
        <p
          style={{
            color: !toggle ? "hsl(231, 11%, 63%)" : "hsl(213, 96%, 18%)",
          }}
        >
          Yearly
        </p>
      </div>
    </div>
  );
};
function Step2({ formData, handleInputChange }) {
  return (
    <div className="step_form">
      <h2>Select you plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
      <PlanButtons onChange={handleInputChange} />
    </div>
  );
}

function Step3({ formData, handleInputChange }) {
  return (
    <div className="step_form">
      <h2>Pick add-ons</h2>
      <p>Add-ons help inhance your gaming experience.</p>
    </div>
  );
}

function Step4({ formData, handleInputChange }) {
  return (
    <div className="step_form">
      <h2>Finishing up</h2>
      <p>Double-check everything looks OK before confirming.</p>
    </div>
  );
}
export default App;
