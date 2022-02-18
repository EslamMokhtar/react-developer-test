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
    const {
      id,
      brand,
      name,
      attributes,
      selectedAttributes,
      quantity,
      gallery,
    } = this.props.product;
    return (
      <div className={classes.cartItem}>
        <div className={classes.column}>
          <div className={classes.leftItems}>
            <div>
              <strong>{brand}</strong>
              <p>{name}</p>
            </div>

            <strong>
              {this.props.symbol} {this.props.price.toFixed(2)}
            </strong>
            {selectedAttributes.length > 0 &&
              attributes.map((attribute) => {
                if (attribute.type === "swatch") {
                  return (
                    <div key={attribute.id}>
                      {attribute.items.map((item) => {
                        return (
                          <button
                            style={{
                              backgroundColor: item.value,
                            }}
                            className={`${classes.colorButtonGroup} ${
                              selectedAttributes.find(
                                (matchedAttribute) =>
                                  matchedAttribute.value === item.displayValue
                              ) && classes.colorSelected
                            }
                       
                      `}
                            key={item.id}
                          />
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <div key={attribute.id}>
                    {attribute.items.map((item) => (
                      <button
                        key={item.id}
                        className={`${classes.attributeButton} ${
                          selectedAttributes.find(
                            (selectedAttribute) =>
                              selectedAttribute.value === item.displayValue &&
                              attribute.name === selectedAttribute.name
                          )
                            ? classes.selected
                            : ""
                        }`}
                      >
                        {item.displayValue}
                      </button>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.addButtons}>
            <button
              onClick={() => {
                this.setState({ slide: classes.slideUp });
                this.props.dispatch(
                  cartActions.addQuantity({
                    id: id,
                    selectedAttributes: selectedAttributes,
                  })
                );
                return setTimeout(() => this.setState({ slide: "" }), 500);
              }}
            >
              +
            </button>
            <div className={classes.quantity}>
              <p className={this.state.slide}>{quantity}</p>
            </div>
            <button
              onClick={() => {
                this.setState({ slide: classes.slideDown });
                this.props.dispatch(
                  cartActions.subQuantity({
                    id: id,
                    selectedAttributes: selectedAttributes,
                  })
                );
                if (quantity > 1) {
                  return setTimeout(() => this.setState({ slide: "" }), 500);
                }
              }}
            >
              {quantity > 1 ? (
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
            src={gallery[0]}
            alt={name}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(ModalItem);
