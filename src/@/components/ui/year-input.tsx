import React from 'react'
import { SelectProps } from '@radix-ui/react-select'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

function YearInput(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um ano" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {VALUES.map(val => (
          <SelectItem key={val} value={String(val)} className="hover:bg-gray-800">{val}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function generateValues() {
  let years = [];
  for (let i = 2014; i <= 2114; i++) {
    years.push(i);
  }
  return years;
}
const VALUES = generateValues()


export default YearInput
