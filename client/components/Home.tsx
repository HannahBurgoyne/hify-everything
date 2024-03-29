import { useState } from 'react'
import Hacked from './Hacked'

function Home() {
  const [userInput, setUserInput] = useState('')
  const [hResult, setShowHResult] = useState(false)
  const [isHacked, setIsHacked] = useState(false) // State to track if the app is hacked

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value)
  }

  function handleScriptInjection() {
    console.log('Potentially malicious script detected!')
    setIsHacked(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUserInput(userInput)
    setShowHResult(true)

    // Check for 'chrome extension' script in the head tag
    const headScripts = document.head.getElementsByTagName('script')
    for (let i = 0; i < headScripts.length; i++) {
      if (headScripts[i].src.toLowerCase().includes('chrome-extension')) {
        // Trigger function to handle script injection
        handleScriptInjection()
        break // Break loop if a 'chrome extension' script is found
      }
    }
    // // Create a new MutationObserver instance
    // const observer = new MutationObserver((mutations) => {
    //   mutations.forEach((mutation) => {
    //     // Check if mutation type is relevant (e.g., attribute change)
    //     if (mutation.type === 'attributes') {
    //       // Trigger function to handle script injection
    //       handleScriptInjection()
    //     }
    //   })
    // })
    // Start observing mutations in the entire document's subtree
    // observer.observe(document.documentElement, {
    //   attributes: true, // Observe changes to attributes of the target or its children
    //   subtree: true, // Observe mutations in the entire document's subtree
    // })
  }

  const splitString = userInput.split('')
  const updatedString = splitString.map((char) => {
    return char.concat('h')
  })
  const result = updatedString.join('').toString()

  return isHacked ? (
    <Hacked handleScriptInjection={handleScriptInjection} />
  ) : (
    <div>
      <h2>Hify Everything</h2>
      <p>
        In a world where Jared wants to remove the letter h, let&apos;s rebel.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">Enter your text here:</label>
        <br />
        <textarea
          onChange={handleChange}
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
