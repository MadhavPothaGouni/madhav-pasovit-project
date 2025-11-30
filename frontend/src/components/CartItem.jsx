export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <img src={item.image} alt="" style={{ width: 70, borderRadius: 6 }} />
      <div style={{ flex: 1 }}>
        <div>{item.name}</div>
        <div>Size: {item.size}</div>
      </div>

      <input
        type="number"
        min="1"
        value={item.qty}
        onChange={(e) => onUpdate(item.product, item.size, parseInt(e.target.value))}
        style={{ width: 60 }}
      />

      <button onClick={() => onRemove(item.product, item.size)}>Remove</button>
    </div>
  );
}
