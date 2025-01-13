const Modal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg w-1/2">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">X</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal; // Default export
  