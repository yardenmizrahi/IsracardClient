import React, { useState } from 'react';

const Card = ({ card, onSelect }) => {
  const [isEnlarging, setIsEnlarging] = useState(false);
  const [frameAmount, setFrameAmount] = useState(0);
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const handleIncreaseFrame = () => {
    // Implement logic to handle increase frame button click
    setIsEnlarging(true);
  };
  
  const handleSubmit = () => {
    // Implement logic to handle form submission
    const requestBody = {
      cardNumber: card.cardNumber,
      requestedFrameAmount: parseInt(frameAmount),
      user: {
        occupation: occupation,
        averageMonthlyIncome: parseInt(monthlyIncome)
      }
    };

  
    fetch('http://localhost:5244/api/Card/IncreaseCreditLimit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to increase credit limit');
        }
        return response.json();
      })
      .then(data => {
        alert('Credit limit increased successfully:', data);
      })
      .catch(error => {
        alert('Error increasing credit limit:', error);
        alert('Error increasing credit limit: ' + error.message); // Display the error message
      });
  };
  
  return (
    <div className="card" onClick={onSelect}>
      <img src={card.imageUrl} alt={card.imageName} />
      <p>Card Number: {card.cardNumber}</p>
      <p>Card Issue Date: {new Date(card.cardIssueDate).toLocaleDateString()}</p>
      <p>Is Digital: {card.isDigital ? 'Yes' : 'No'}</p>
      <p>Card Frame: {card.cardFrame}</p>
      <p>Bank Code: {card.bankCode}</p>
      {isEnlarging && (
        <div className="enlarge-frame-form">
          <label htmlFor="frameAmount">Requested Frame Amount: </label>
          <input
            id="frameAmount"
            type="number"
            placeholder="Enter requested frame amount"
            value={frameAmount}
            onChange={(e) => setFrameAmount(e.target.value)}
          />
          <label htmlFor="occupation">Employee Status: </label>
          <select
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          >
            <option value="">Select Occupation</option>
            <option value="EMPLOYED">Employed</option>
            <option value="SELF_EMPLOYED">Self Employed</option>
            <option value="OTHER">Other</option>
          </select>
          <label htmlFor="averageMonthlyIncome">Average Monthly Income: </label>
          <input
            id="monthlyIncome"
            type="number"
            placeholder="Enter average monthly income"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <button onClick={handleIncreaseFrame} disabled={isEnlarging || card.isBlocked}>
        {card.isBlocked ? 'Blocked' : 'Increase Frame'}
      </button>
    </div>
  );
}

export default Card;
