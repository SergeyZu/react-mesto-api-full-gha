import { useState } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;

    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });
  };

  return { errors, handleChange };
};

export default useValidation;
