import React from 'react'

const InputField = ({ label, value, onChange, placeHolder }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if(/^\d+$/.test(inputValue)){
      onChange(e)
    }
  }

  return (
    <div className="text-xl">
      <label className="text-stone-300">{label}:</label>
      <input
      type='number'
        value={value}
        onChange={handleInputChange}
        placeholder={placeHolder}
        className="w-20 bg-transparent text-blue-400"
      />
    </div>
  )
}

export default InputField
