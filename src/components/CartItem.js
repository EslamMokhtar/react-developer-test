import { Component } from "react/cjs/react.production.min";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "../shared/ImageGallery";
import SelectedAttributes from "../shared/SelectedAttributes";

class CartItem extends Component {
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
      <div className={classes.card}>
        <div className={classes.leftColumn}>
          <div>
            <strong>{brand}</strong>
            <p>{name}</p>
          </div>
          <strong>
            {this.props.symbol}
            {this.props.price.toFixed(2)}
          </strong>
          <SelectedAttributes
            attributes={attributes}
            selectedAttributes={selectedAttributes}
            classes={classes}
            showText={true}
          />
        </div>

        <div className={classes.rightColumn}>
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

          <div className={classes.slideshowContainer}>
            <ImageGallery images={gallery} haveLink={0} hover={1} />
          </div>
          <div className={classes.deleteButton}>
            <button
              onClick={() =>
                this.props.dispatch(
                  cartActions.removeProduct({
                    id: id,
                    selectedAttributes: selectedAttributes,
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
