import React, { useCallback, useState } from "react";

function usePopupValidity() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    const error = event.target.validationMessage;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    const isValid = event.target.closest("form").checkValidity();
    setIsValid(isValid);
  };

  const resetValidation = useCallback(
    (values = {}, errors = {}, isValid = false) => {
      setValues(values);
      setErrors(errors);
      setIsValid(isValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    errors,
    handleChange,
    setValues,
    setErrors,
    resetValidation,
    isValid,
  };
}

export default usePopupValidity;
