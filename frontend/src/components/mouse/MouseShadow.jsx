import React, { useEffect, useState } from 'react'

const MouseShadow = () => {

    const [mouseX, setMouseX] = useState(null)
    const [mouseY, setMouseY] = useState(null)


    useEffect(() => {
        function animateCustomCursorShadow(e) {
            setMouseX(e.clientX)
            setMouseY(e.clientY)
        }

        window.addEventListener("mousemove", animateCustomCursorShadow)

        return () => {
            window.removeEventListener("mousemove", animateCustomCursorShadow)
        }
    }, [])

  return (
    <div className='fixed top-0 left-0 w-10 h-10 bg-pink-400 filter blur-2xl pointer-events-none' style={{left: mouseX, top: mouseY}}></div>
  )
}

export default MouseShadow