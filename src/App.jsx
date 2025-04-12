import { useState } from 'react'
import { useEffect } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [buttonColor, setButtonColor] = useState()
  const [colors,addColors] = useState([])
  const hex = '0123456789ABCDEF'
  const [maxSavedColor] = useState(Math.floor(Math.random() * 3) + 3)

  useEffect(() => {
    console.log("Max Saved Color: " + maxSavedColor);
  }, []);

  const addColor = (newColor) => {
    addColors((prevColors) => {

        return [...prevColors, newColor]
    })
  
  }
  function getComplementaryColor(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  function onClickButton() {
    var color;
    setCount((count) => count + 1)
    if (count < maxSavedColor) {
      color = '#' + Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join('');
      addColor(color);
    } else {
      color = colors[count % maxSavedColor]
    }
    document.body.style.backgroundColor = color
    let complementary = getComplementaryColor(color)
    document.body.style.color = complementary
    setButtonColor(complementary)
    console.log("count: " + count + "color: " + color)
    console.log(colors)

  }

  return (
    <>

      <button onClick={onClickButton} style ={{backgroundColor: `${buttonColor}`}}> Click Me </button>
      <p>Number of times clicked: {count}</p>
    </>
  )
}

export default App
