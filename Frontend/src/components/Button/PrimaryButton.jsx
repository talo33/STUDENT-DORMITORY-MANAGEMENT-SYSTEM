export const PrimaryButton = ({ type = 'button', className, text, Icon, onClick, disabled = false }) => {
  return (
    <button type={type} className={`shared_primary_button ${className}`} onClick={onClick} disabled={disabled}>
      {/* <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
      {Icon && <Icon className="-ml-0.5 h-4 w-4" aria-hidden="true" />}
      {text}
    </button>
  );
};
