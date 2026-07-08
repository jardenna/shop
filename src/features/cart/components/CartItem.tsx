import './CartItem.scss';

export default function CartItem({
  image = 'https://placehold.co/200x200/e5e5e5/999?text=Product',
  title = 'ELITE PERFORMANCE TEE',
  color = 'GREY',
  size = 'M',
  originalPrice = 35.0,
  price = 28.0,
  qty = 1,
}: any) {
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item__image" />

      <h3 className="cart-item__title">{title}</h3>

      <div className="price-group">
        {originalPrice > price && (
          <span className="price-group__original">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <span className="price-group__current">${price.toFixed(2)}</span>
      </div>

      <div className="cart-item__meta">
        <span>{color}</span>
        <span>SIZE {size}</span>
      </div>

      {/* Antal-vælger: minus-knap, antal, plus-knap */}
      <div className="quantity">
        <span>−</span>
        <span>{qty}</span>
        <span>+</span>
      </div>

      {/* Handlinger: fjern fra kurv, læg i ønskeliste */}
      <div className="actions">icon trash icon hart</div>
    </div>
  );
}
