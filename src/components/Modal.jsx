const Modal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg w-11/12 max-h-[700px] overflow-y-auto md:overflow-hidden md:max-h-[800px] md:w-1/2">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">X</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal; // Default export
  