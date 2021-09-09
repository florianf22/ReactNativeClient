import React from 'react';
import { Text } from 'react-native-elements';
import { useValidation } from 'react-native-form-validator';

export default (state, callback) => {
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state,
    });

  const validateValues = () => {
    const result = validate({
      // if state object has name property and it's not empty string, run the validators then
      ...((state.name || state.name === '') && {
        name: { minlength: 3, maxlength: 7, required: true },
      }),
      email: { email: true, required: true },
      password: {
        minlength: 8,
        // hasNumber: true,
        // hasUpperCase: true,
        // hasLowerCase: true,
        // hasSpecialCharacter: true,
        required: true,
      },
      // if state object has name property and it's not empty string, run the validators then
      ...((state.passwordConfirm || state.passwordConfirm === '') && {
        passwordConfirm: { equalPassword: state.password, required: true },
      }),
    });

    if (result) {
      callback();
    }
  };

  const renderErrorConditionally = (fieldName) => {
    return (
      isFieldInError(fieldName) &&
      getErrorsInField(fieldName).map((errorMessage, idx) => {
        if (idx === 0) {
          return (
            <Text key={idx} style={{ color: 'red', marginTop: -20 }}>
              {errorMessage}
            </Text>
          );
        }
        return (
          <Text key={idx} style={{ color: 'red' }}>
            {errorMessage}
          </Text>
        );
      })
    );
  };

  return [validateValues, renderErrorConditionally];
};
