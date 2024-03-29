import { useEffect } from 'react'

interface Props {
  handleScriptInjection(): void
}

export default function Hacked({ handleScriptInjection }: Props) {
  useEffect(() => {
    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if mutation type is relevant (e.g., attribute change)
        if (mutation.type === 'attributes') {
          // Trigger function to handle script injection
          handleScriptInjection()
        }
      })
    })

    // Start observing mutations in the entire document's subtree
    observer.observe(document.documentElement, {
      attributes: true, // Observe changes to attributes of the target or its children
      subtree: true, // Observe mutations in the entire document's subtree
    })

    // Cleanup function to disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <div className="hacked format">
      <h1 className="hacked">LUCAS IS COMING FOR YOU M8</h1>
      <img
        width={500}
        src="https://media.tenor.com/a4fSQZ1w-BoAAAAM/police-cars-police-chase.gif"
        alt="several cop cars after after you, punk"
      />
    </div>
  )
}
