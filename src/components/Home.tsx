import React from 'react'
import { useHistory } from 'react-router'

const Home: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <button onClick={() => history.push('/signup')}>Sign up</button>
      <div>
        <h1>Hello, world!</h1>
      </div>
    </>
  )
}

export default Home