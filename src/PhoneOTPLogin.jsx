import React, { useState } from "react";
import OTPInput from "./OTPInput";

const PhoneOTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    generateOTP()//dummy OTP
    setShowOTPInput(true);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };




  const generateOTP=()=>{
    var genOTP =  Math.round(Math.random() * (9999 - 1000) + 1000) // Math.random() * (max - min) + min
    setGeneratedOTP(genOTP);
    console.log("Generated OTP",genOTP);
    console.log("GENERATED OTP", generatedOTP);
  }
  //Validation - after OTP submitted by the user
  const onOTPSubmit = (otp) => {
    if(otp==generatedOTP){console.log("Logged in Successfully EnteredOTP=", otp, "generatedOTP=", generatedOTP); setIsLoggedIn(true)}
    else{console.log("Wrong OTP Entered")};
  };

  return (
    <>
      {!showOTPInput ? (
        <div>
          <h4>PhoneOTPLogin</h4>
          <form onSubmit={handlePhoneSubmit}>
            <input
            style={{"height":"2.5rem", "width":"15rem",'margin':'0.5rem'}}
              type="text"
              placeholder="Enter Number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        !isLoggedIn ?(<div>
        <h3>{`Enter the OTP that was sent to ${phoneNumber}`}</h3>
        <OTPInput length={4} onOTPSubmit={onOTPSubmit}  />
      </div>):(<><h4 style={{"color":"green"}}>Logged in successfully</h4></>)
      )}
    </>
  );
};

export default PhoneOTPLogin;
