import React, { useEffect, useState } from 'react' // Import useEffect and useState from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'
import Hacked from './components/Hacked.tsx' // Import the Hacked component

function ScriptInjectionDetector() {
  const [isHacked, setIsHacked] = useState(false) // State to track if the app is hacked

  useEffect(() => {
    // Function to be triggered when a script tag is detected
    function handleScriptInjection() {
      // Take appropriate action here (e.g., display warning message, log event)
      console.log('Potentially malicious script detected!')
      setIsHacked(true) // Update state to indicate the app is hacked
    }

    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutations) => {
      // Iterate through each mutation
      mutations.forEach((mutation) => {
        // Check if the mutation added nodes
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Iterate through added nodes
          mutation.addedNodes.forEach((node) => {
            // Check if the node is a script tag or contains potentially malicious content
            if (
              node.nodeName === 'SCRIPT' ||
              (node.nodeType === Node.TEXT_NODE &&
                /<script[\s\S]*?>/i.test(node.textContent))
            ) {
              // Trigger function to handle script injection
              handleScriptInjection()
            }
          })
        }
      })
    })

    // Start observing mutations in the entire document's subtree
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

    // Cleanup function to disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, []) // Empty dependency array ensures this effect runs only once after component mount

  // Render the App or Hacked component based on the state
  return isHacked ? <Hacked /> : <App />
}

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app') as HTMLElement
  createRoot(rootElement).render(<ScriptInjectionDetector />)
})
