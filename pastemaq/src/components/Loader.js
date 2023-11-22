import React from 'react';
import LoaderGIF from '../assets/loading.svg';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader-animation">
                <img src={LoaderGIF} alt="Loading" />
            </div>
        </div>
    );
};

export default Loader;
