import React, { useState } from 'react';

const Register: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Option 1
          <input
            type="radio"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleChange}
          />
        </label>
        <label>
          Option 2
          <input
            type="radio"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={handleChange}
          />
        </label>
      </form>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Register;
