import { Component } from "react/cjs/react.production.min";
import { cartActions } from "../store/cart-slice";
import { connect } from "react-redux";
import classes from "./ModalItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ModalItem extends Component {
  render() {
    return (
      <div className={classes.cartItem}>
        <div className={classes.column}>
          <div style={{ paddingLeft: "0px" }} className={classes.leftItems}>
            <div>
              <strong>{this.props.brand}</strong>
              <p>{this.props.name}</p>
            </div>

            <strong>
              {this.props.symbol}{" "}
              {(this.props.price * this.props.quantity).toFixed(2)}
            </strong>

            {this.props.attributeName && (
              <div className={classes.attributeButton}>
                <h5 style={{ paddingRight: "5px" }}>
                  {this.props.attributeName}
                </h5>
                <button>{this.props.attribute}</button>
              </div>
            )}
          </div>
        </div>
        <div className={classes.column}>
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
            <p style={{ marginRight: "9px" }}>{this.props.quantity}</p>
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

          <img
            className={classes.profile}
            width="100%"
            src={this.props.image}
            alt="Pic"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(ModalItem);
