import * as React from "react";
import { UserFormProps } from '../../@types/types'

export default function UserForm ({setUserInput,userInput,handleSubmit}: UserFormProps){
  return (
    <>
    <p>Enter the number of days that you'd like to see the exchange rate for and click submit:</p>
    <form onSubmit={handleSubmit} aria-label='daysInputForm'>
      <label>Days:<input
        type="number"
        min={1}
        max={30}
        name="days" 
        onChange={(e) => setUserInput(parseInt(e.target.value))}
        value={userInput}/>
      </label>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export { UserForm }