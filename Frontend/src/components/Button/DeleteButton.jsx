import TrashIcon from 'components/icons/TrashIcon';

export const DeleteButton = ({ type = 'button', className, text, onClick }) => {
  return (
    <button type={type} className={`shared_delete_button ${className}`} onClick={onClick}>
      <TrashIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      {text}
    </button>
  );
};
