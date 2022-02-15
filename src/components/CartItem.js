import { Component } from "react/cjs/react.production.min";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "../shared/ImageGallery";

class CartItem extends Component {
  constructor() {
    super();
    this.state = { slide: "" };
  }
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
          {this.props.attributeName && (
            <div className={classes.attributeButton}>
              <h5 style={{ paddingRight: "5px" }}>
                {this.props.attributeName}
              </h5>
              <button>{this.props.attribute}</button>
            </div>
          )}
        </div>

        <div className={classes.rightColumn}>
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
              <p
                style={{ fontSize: "20px", position: "relative" }}
                className={this.state.slide}
              >
                {this.props.quantity}
              </p>
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
                return setTimeout(() => this.setState({ slide: "" }), 500);
              }}
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
