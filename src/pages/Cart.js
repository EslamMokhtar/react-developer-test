import { Component } from "react/cjs/react.production.min";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "../components/CartItem";

class Cart extends Component {
  render() {
    if (this.props.items.length === 0) {
      return (
        <div className={classes.empty}>
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_GlZGOi.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            autoplay
          />
          <h1>Your cart is empty!</h1>
        </div>
      );
    }
    const items = [...this.props.items].reverse();
    const total = this.props.items.map((item) => {
      const quantity = item.quantity;
      const foundedAmount = item.prices.find(
        (price) => price.currency.label === this.props.currency.label
      );
      return quantity * foundedAmount.amount;
    });
    const reducerTotal = (pre, curr) => pre + curr;
    const totalAmount = total.reduce(reducerTotal, 0);

    return (
      <div className={classes.container}>
        <h1 className={classes.title}>CART</h1>
        <div className={classes.cards}>
          {items.map((item, index) => {
            const matchCurrency = item.prices.find(
              (price) => price.currency.label === this.props.currency.label
            );

            return (
              <CartItem
                key={index}
                symbol={matchCurrency.currency.symbol}
                price={matchCurrency.amount}
                product={item}
              />
            );
          })}
        </div>

        <div className={classes.footer}>
          <div className={classes.total}>
            <p>Total</p>
            <p>
              {this.props.currency.symbol}
              {totalAmount.toFixed(2)}
            </p>
          </div>
          <div className={classes.button}>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  total: state.cart.total,
  currency: state.currency.currency,
});
export default connect(mapStateToProps)(Cart);
