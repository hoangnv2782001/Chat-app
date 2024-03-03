import React from "react";

import { FormProvider as Form } from "react-hook-form";

/**
 * This component will host context object 
 * and allow consuming component to subscribe to context and use useForm props and methods
 * @param {*} { children, onSubmit, methods } 
 * @returns 
 */
const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>
      
        {children}
      </form>
  
    </Form>
  );
};

export default FormProvider;
