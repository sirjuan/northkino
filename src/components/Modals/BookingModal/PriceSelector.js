import React from 'react';
import { Input } from 'reactstrap'

const PriceSelector = ({handleChange, seat, seats}) => {
  
  const prices = Object.values(seat.prices)

  const onChange = (e) => {
    const price = prices.find(i => i.name === e.target.value)
    handleChange(seat, price)
  }

  return (
    <Input
      type="select"
      className='select-price'
      onChange={onChange}
      selected={seat.price.name}
      >
      {prices.map(price => <option key={price.name} value={price.name}>{price.name} - {price.price}€</option>)}
    </Input>
  )
}

export default PriceSelector
