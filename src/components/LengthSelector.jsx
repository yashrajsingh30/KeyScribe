import React from 'react';
export default function LengthSelector({ value,onChange }) {
  return (
    <div className="flex items-center mb-4 space-x-4">
      {['short','medium','detailed'].map(opt=>(
        <label key={opt} className="inline-flex items-center">
          <input type="radio" name="length" value={opt} checked={value===opt} onChange={()=>onChange(opt)} className="form-radio text-primary"/>
          <span className="ml-2 capitalize">{opt}</span>
        </label>
      ))}
    </div>
  );
}