import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../commons/Button";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindAddressButton = ({ onCompleted }: Props) => {
  const handleOpen = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <FindAddressButtonStyle
      type="button"
      size="small"
      scheme="normal"
      onClick={handleOpen}
    >
      주소 찾기
    </FindAddressButtonStyle>
  );
};

const FindAddressButtonStyle = styled(Button)``;

export default FindAddressButton;
