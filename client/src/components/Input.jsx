const Input = ({ value, setValue, placeholder }) => {
  return (
    <div className="py-3">
      <input
        name="gameRoom"
        type="text"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="form-control "
      />
    </div>
  );
};

export default Input;
