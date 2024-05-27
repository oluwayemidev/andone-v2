import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/NotFoundPage.css"; // Custom CSS file for additional styling

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={handleBack} type="primary">
            Back
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
