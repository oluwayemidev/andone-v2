import { Button } from 'antd';
import React from 'react';
import './yesorno.css';

const Yesorno = (props) => {
    return (
        <div className="yes-no-buttons">
            <Button type="text" onClick={props.actionProvider.quoteFunc} size="small" className="yes-button">
                Yes
            </Button>
            <Button type="text" onClick={props.actionProvider.noFunc} size="small" className="no-button">
                No
            </Button>
        </div>
    );
}

export default Yesorno;
