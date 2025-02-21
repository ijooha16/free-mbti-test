const Btn = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-[40px] p-[16px_30px] rounded-full bg-primary text-white
      hover:scale-110 hover:bg-sub01 transition-transform duration-300 ease-in-out"
    >
      {text}
    </button>
  );
};

export default Btn;
