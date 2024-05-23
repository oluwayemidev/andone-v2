import { Button } from 'antd';
import React from 'react';
import './solarQuestions.css';

const SolarQuestions = (props) => {
    const questions = [
        {
            text: "More about solar panels",
            handle: props.actionProvider.solarPanelQst1Func,
        },
        {
            text: "Get Quotation",
            handle: props.actionProvider.solarPanelQst2Func,
        },
    ];

    return (
        <div className="solar-questions">
            {questions.map((btn, index) => {
                return (
                    <Button type="primary" ghost onClick={btn.handle} key={index} className="question-button">
                        {btn.text}
                    </Button>
                );
            })}
        </div>
    );
}

export default SolarQuestions;
