const getFormErrorMessage = (name, errors) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};
export { getFormErrorMessage as default, getFormErrorMessage}