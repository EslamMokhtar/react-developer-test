import { Component } from "react/cjs/react.production.min";
import { cartActions } from "../store/cart-slice";
import { connect } from "react-redux";
import classes from "./ModalItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ModalItem extends Component {
  constructor() {
    super();
    this.state = { slide: "" };
  }

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
              onClick={() => {
                this.setState({ slide: classes.slideUp });
                this.props.dispatch(
                  cartActions.addQuantity({
                    id: this.props.id,
                    attribute: this.props.attribute,
                  })
                );
                return setTimeout(() => this.setState({ slide: "" }), 500);
              }}
            >
              +
            </button>
            <div style={{ height: "30px", overflow: "hidden" }}>
              <p style={{ marginRight: "9px" }} className={this.state.slide}>
                {this.props.quantity}
              </p>{" "}
            </div>
            <button
              onClick={() => {
                this.setState({ slide: classes.slideDown });
                this.props.dispatch(
                  cartActions.subQuantity({
                    id: this.props.id,
                    attribute: this.props.attribute,
                  })
                );
                if (this.props.quantity > 1) {
                  return setTimeout(() => this.setState({ slide: "" }), 500);
                }
              }}
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
            alt={this.props.name}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(ModalItem);
