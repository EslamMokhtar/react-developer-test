import { Component } from "react/cjs/react.production.min";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "../shared/ImageGallery";

class CartItem extends Component {
  render() {
    return (
      <div className={classes.card}>
        <div className={classes.leftColumn}>
          <div>
            <strong>{this.props.brand}</strong>
            <p>{this.props.name}</p>
          </div>
          <p>
            {this.props.symbol}
            {(this.props.price * this.props.quantity).toFixed(2)}
          </p>
          <div className={classes.buttons}>
            <h5 style={{ paddingRight: "5px" }}>{this.props.attributeName}:</h5>
            <button>{this.props.attribute}</button>
          </div>
        </div>

        <div className={classes.rightColumn}>
          <div className={classes.addButtons}>
            <button
              onClick={() =>
                this.props.dispatch(
                  cartActions.addQuantity({
                    id: this.props.id,
                    attribute: this.props.attribute,
                  })
                )
              }
            >
              +
            </button>
            <p style={{ fontSize: "20px" }}>{this.props.quantity}</p>
            <button
              onClick={() =>
                this.props.dispatch(
                  cartActions.subQuantity({
                    id: this.props.id,
                    attribute: this.props.attribute,
                  })
                )
              }
            >
              {" "}
              {this.props.quantity > 1 ? (
                "-"
              ) : (
                <FontAwesomeIcon
                  icon={faTrash}
                  size="sm"
                  className={classes.icon}
                />
              )}
            </button>
          </div>

          <div className={classes.slideshowContainer}>
            <ImageGallery images={this.props.images} haveLink={0} />
          </div>
          <div className={classes.deleteButton}>
            <button
              onClick={() =>
                this.props.dispatch(
                  cartActions.removeProduct({
                    id: this.props.id,
                    attribute: this.props.attribute,
                  })
                )
              }
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                className={classes.icon}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(CartItem);
