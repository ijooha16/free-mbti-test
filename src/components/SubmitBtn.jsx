const SubmitBtn = ({ type, text }) => {
  return (
    <button type={type} className="mt-[40px] p-[12px_20px] rounded-full bg-gray-200">
      {text}
    </button>
  );
};

export default SubmitBtn;
