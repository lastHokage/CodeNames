const Input = ({ value, setValue }) => {
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <input
        name="gameRoom"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter a room code"
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
    </div>
  );
};

export default Input;
