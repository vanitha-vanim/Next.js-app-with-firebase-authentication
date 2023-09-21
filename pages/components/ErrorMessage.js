import React from 'react';
// import '../styles/style.css';

const ErrorMessage = () => {

   const styleobject = {
       width: '3rem',
       height: '3rem',
   }
   
  return (
    <div  className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">erreirrrrr...</span>
        </div>
    </div>
  );
};

export default ErrorMessage;
