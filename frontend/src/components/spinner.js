import React from 'react';
import './spinner.scss';

const Spinner = ({ show }) => {
    if(show) {
        return (
            <div className="spinner">
                <div className="roller">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>

            </div>
        )
    }
    return null;
}

export default Spinner;