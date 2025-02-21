const SubmitBtn = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-[40px] p-[12px_20px] rounded-full bg-gray-200"
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
