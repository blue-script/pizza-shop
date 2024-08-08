import { MouseEvent } from "react"
import { Button } from "./components/Button"
import { Input } from "./components/Input"

function App() {
  const addCounter = (e: MouseEvent) => {
    console.log(e)
  }

  return (
    <>
      <Button onClick={addCounter}>Кнопка</Button>
      <Button onClick={addCounter} appearance='big'>Кнопка</Button>
      <Input />
    </>
  )
}

export default App
