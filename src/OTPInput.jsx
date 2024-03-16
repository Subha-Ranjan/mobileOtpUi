import React, { useEffect, useRef, useState } from "react";

const OTPInput = ({ length, onOTPSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  console.log(inputRefs);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleChange(e, i) {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    //allow only one input
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);
    //submit trigger
    const combinedOTP = newOtp.join("");
    if(combinedOTP.length===4){onOTPSubmit(combinedOTP)}

    //move forward once filled
    if(value && i<length-1 && inputRefs.current[i+1]){
      inputRefs.current[i+1].focus();
    }
  
  }

  //handle Cursor - move to the end of the each field
  function handleClick(i) {
    inputRefs.current[i].setSelectionRange(0,1);
  }

  //To Handle backspace
  function handleKeyDown(e, i) {
    if(e.key==="Backspace" && !otp[i] && i>0 && inputRefs.current[i-1]){
      inputRefs.current[i-1].focus();
    }
  }


  return (
    <div>
      {otp.map((value, i) => {
        return (
          <div key={i}>
            {
              <input
                key={i}
                ref={(input) => (inputRefs.current[i] = input)}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, i)}
                onClick={() => handleClick(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="otpInput"
              />
            }
          </div>
        );
      })}
    </div>
  );
};

export default OTPInput;
