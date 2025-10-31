import { useState, useCallback } from 'react';

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Form Validation Hook with Real-Time Feedback
 * Usage:
 * const { values, errors, handleChange, handleBlur, validate } = useFormValidation({
 *   email: '',
 *   password: ''
 * }, {
 *   email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
 *   password: { required: true, minLength: 8 }
 * });
 */
export const useFormValidation = <T extends Record<string, string>>(
  initialValues: T,
  rules: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Set<keyof T>>(new Set());

  const validateField = useCallback(
    (field: keyof T, value: string): string | undefined => {
      const fieldRules = rules[field];
      if (!fieldRules) return undefined;

      if (fieldRules.required && !value.trim()) {
        return `${String(field)} is required`;
      }

      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        return `${String(field)} must be at least ${fieldRules.minLength} characters`;
      }

      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        return `${String(field)} must not exceed ${fieldRules.maxLength} characters`;
      }

      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        return `${String(field)} format is invalid`;
      }

      if (fieldRules.custom && !fieldRules.custom(value)) {
        return `${String(field)} is invalid`;
      }

      return undefined;
    },
    [rules]
  );

  const handleChange = useCallback(
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));

      // Real-time validation for touched fields
      if (touched.has(field)) {
        const error = validateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => new Set(prev).add(field));
      const error = validateField(field, values[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [values, validateField]
  );

  const validate = useCallback((): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    (Object.keys(rules) as Array<keyof T>).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(new Set(Object.keys(rules) as Array<keyof T>));
    return isValid;
  }, [rules, values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(new Set());
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
  };
};

export default useFormValidation;

