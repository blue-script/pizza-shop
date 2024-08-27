import {Button} from "../../components/Button"
import s from "./success.module.css"
import {useNavigate} from "react-router-dom"

export const Success = () => {
  const navigate = useNavigate()

  return (
    <div className={s.success}>
      <img src="/pizza.png" alt="pizza image"/>
      <p className={s.text}>
        Your order has been successfully completed
      </p>
      <Button appearance="big" onClick={() => navigate("/")}>
        new order
      </Button>
    </div>
  )
}
