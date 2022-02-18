import { Component } from "react/cjs/react.production.min";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Modal.module.css";
import ModalItem from "./ModalItem";

class Modal extends Component {
  render() {
    if (this.props.items.length === 0) {
      return (
        <div id="myModal" className={classes.modal}>
          <div
            className={classes.overlay}
            onClick={() => this.props.onClickModal()}
          />
          <div className={classes.modalContent}>
            <div className={classes.empty}>
              <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_GlZGOi.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                autoplay
              />
              <h2>Your bag is empty!</h2>
            </div>
          </div>
        </div>
      );
    }
    const items = [...this.props.items].reverse();
    const total = this.props.items.map((item) => {
      const quantity = item.quantity;
      const foundedAmount = item.prices.find(
        (price) => price.currency.label === this.props.currency.label
      );
      return { totalQ: quantity * foundedAmount.amount, quantity };
    });
    const reducerTotal = (pre, curr) => pre + curr.totalQ;
    const reducerQuantity = (pre, curr) => pre + curr.quantity;
    const totalAmount = total.reduce(reducerTotal, 0);
    const totalQuantity = total.reduce(reducerQuantity, 0);
    return (
      <div id="myModal" className={classes.modal}>
        <div
          className={classes.overlay}
          onClick={() => this.props.onClickModal()}
        />
        <div className={classes.modalContent}>
          <p style={{ paddingBottom: "20px" }}>
            <strong>My Bag, </strong>
            {totalQuantity} {totalQuantity < 2 ? "item" : "items"}
          </p>
          <div className={classes.modalItems}>
            {items.map((item, index) => {
              const matchCurrency = item.prices.find(
                (price) => price.currency.label === this.props.currency.label
              );

              return (
                <ModalItem
                  key={index}
                  symbol={matchCurrency.currency.symbol}
                  price={matchCurrency.amount}
                  product={item}
                />
              );
            })}
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p>
              {this.props.currency.symbol}
              {totalAmount.toFixed(2)}
            </p>
          </div>
          <div className={classes.buttonGroup}>
            <Link to="/cart">
              <button
                className={classes.bagButton}
                onClick={() => this.props.onClickModal()}
              >
                View Bag
              </button>
            </Link>
            <button className={classes.checkoutButton}>Check Out</button>
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
export default connect(mapStateToProps)(Modal);
