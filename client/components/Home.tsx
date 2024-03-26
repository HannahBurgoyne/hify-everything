import { useState } from 'react'

function Home() {
  const [userInput, setUserInput] = useState('')
  const [hResult, setShowHResult] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUserInput(userInput)
    setShowHResult(true)

    return userInput
  }

  const splitString = userInput.split('')

  const updatedString = splitString.map((char) => {
    return char.concat('h')
  })

  const result = updatedString.join('').toString()

  return (
    <div>
      <h2>Hify Everything</h2>
      <p>
        In a world where Jared wants to remove the letter h, let&apos;s rebel.
      </p>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="userInput">Enter your text here:</label>
        <br />
        <textarea
          onChange={(e) => handleChange(e)}
          id="userInput"
          name="userInput"
          value={userInput}
        />
        <br />
        <button>Submit</button>
      </form>

      {hResult && (
        <div>
          <h4>Result: </h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default Home
