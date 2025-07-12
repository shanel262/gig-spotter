import React from 'react';
import './Parameters.css';

// Parameters component that renders different types of input components
// This component is reusable and can handle various input types like text boxes, radio buttons, dropdowns, and buttons
const Parameters = ({ parameters, onParameterChange, onSubmit }) => {
  // Function to render different input types based on the parameter configuration
  const renderInput = (param) => {
    const { id, type, label, placeholder, options, value, required } = param;

    switch (type) {
      case 'text':
        return (
          <div className="form-group" key={id}>
            <label className="form-label" htmlFor={id}>
              {label} {required && <span className="required">*</span>}
            </label>
            <input
              id={id}
              type="text"
              className="form-input"
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) => onParameterChange(id, e.target.value)}
              required={required}
            />
          </div>
        );

      case 'dropdown':
        return (
          <div className="form-group" key={id}>
            <label className="form-label" htmlFor={id}>
              {label} {required && <span className="required">*</span>}
            </label>
            <select
              id={id}
              className="form-input"
              value={value || ''}
              onChange={(e) => onParameterChange(id, e.target.value)}
              required={required}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'radio':
        return (
          <div className="form-group" key={id}>
            <label className="form-label">
              {label} {required && <span className="required">*</span>}
            </label>
            <div className="radio-group">
              {options.map((option) => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    name={id}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onParameterChange(id, e.target.value)}
                    required={required}
                  />
                  <span className="radio-label">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-group" key={id}>
            <label className="checkbox-option">
              <input
                type="checkbox"
                id={id}
                checked={value || false}
                onChange={(e) => onParameterChange(id, e.target.checked)}
              />
              <span className="checkbox-label">{label}</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="parameters-container">
      <h2>Search Parameters</h2>
      
      {/* Render all parameter inputs */}
      <div className="parameters-form">
        {parameters.map(renderInput)}
      </div>

      {/* Submit button */}
      {onSubmit && (
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onSubmit}
          >
            Search for Gigs
          </button>
        </div>
      )}
    </div>
  );
};

export default Parameters; 
