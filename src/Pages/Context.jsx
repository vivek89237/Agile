import React, { createContext } from 'react'
import DashBoard from './DashBoard';
const FirstName = createContext();
const LastName = createContext();

function Context() {
  const [name, setName] = useState({
    fname:"Vivek",
    lname:"Kushawaha"
  })
  return (
    <div>
        <FirstName.provider value={name} >
            
                <DashBoard />
            
        </FirstName.provider>
    </div>
  )
}

export default Context;
export {FirstName };