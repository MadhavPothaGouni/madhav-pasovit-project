import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="container">
      <h3>Order Successful</h3>
      <p>Order ID: {id}</p>
    </div>
  );
}
