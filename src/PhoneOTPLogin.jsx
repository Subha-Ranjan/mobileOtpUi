import React, { useState } from "react";
import OTPInput from "./OTPInput";

const PhoneOTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    //1. phone num valdation
    const regex = /[^0-9]/g;
    console.log(regex.test(phoneNumber));
    if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    //2. call the backend API

    //3. show OTP Field
    setShowOTPInput(true);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  //Validation - after OTP submitted by the user
  const onOTPSubmit = (otp) => {
    console.log("Logged in Successfully", otp);
  };

  return (
    <>
      {!showOTPInput ? (
        <div>
          <h4>PhoneOTPLogin</h4>
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              placeholder="Enter Number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>{`Enter the OTP that was sent to ${phoneNumber}`}</h3>
          <OTPInput length={4} onOTPSubmit={onOTPSubmit} />
        </div>
      )}
    </>
  );
};

export default PhoneOTPLogin;
