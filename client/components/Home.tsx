import { useState } from 'react'
import Hacked from './Hacked'

function Home() {
  const [userInput, setUserInput] = useState('')
  const [hResult, setShowHResult] = useState(false)
  const [isHacked, setIsHacked] = useState(false) // State to track if the app is hacked

  function handleChange(e) {
    setUserInput(e.target.value)
  }

  function handleScriptInjection() {
    // Take appropriate action here (e.g., display warning message, log event)
    console.log('Potentially malicious script detected!')
    setIsHacked(true) // Update state to indicate the app is hacked
  }

  function handleSubmit(e) {
    e.preventDefault()
    setUserInput(userInput)
    setShowHResult(true)

    // // Check for 'chrome extension' script in the head tag
    // const headScripts = document.head.getElementsByTagName('script')
    // for (let i = 0; i < headScripts.length; i++) {
    //   if (headScripts[i].src.toLowerCase().includes('chrome-extension')) {
    //     // Trigger function to handle script injection
    //     handleScriptInjection()
    //     break // Break loop if a 'chrome extension' script is found
    //   }
    // }
  }

  // Create a new MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check if a change is made to the style attribute of any element
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'style'
      ) {
        const targetElement = mutation.target as HTMLElement
        // Check if the background color of the element is changed to black
        if (targetElement.style.backgroundColor === 'black') {
          // Trigger function to handle script injection
          handleScriptInjection()
        }
      }
    })
  })

  // Start observing mutations in the entire document's subtree
  observer.observe(document.documentElement, {
    attributes: true, // Observe changes to attributes
    attributeFilter: ['style'], // Only observe changes to the style attribute
    subtree: true,
  })

  const splitString = userInput.split('')
  const updatedString = splitString.map((char) => {
    return char.concat('h')
  })
  const result = updatedString.join('').toString()

  return isHacked ? (
    <Hacked />
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
