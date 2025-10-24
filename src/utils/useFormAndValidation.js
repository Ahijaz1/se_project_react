import { useCallback, useState } from "react";

function useFormAndValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true); // Start with true to allow initial interaction

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));

    // Check form validity after a slight delay to ensure all fields are updated
    setTimeout(() => {
      const form = e.target.closest("form");
      if (form) {
        setIsValid(form.checkValidity());
      }
    }, 0);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
  };
}

export default useFormAndValidation;
