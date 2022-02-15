import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import ImageGallery from "../shared/ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../store/cart-slice";
import { connect } from "react-redux";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      attribute: null,
      showError: false,
    };
  }
  render() {
    const { attributes, id, gallery, inStock, name } = this.props.product;
    return (
      <div className={classes.column}>
        <div className={`${classes.card} ${!inStock && classes.outOfStock}`}>
          <div className={classes.content}>
            <div className={classes.profile}>
              {!inStock ? (
                <Link to={`/${this.props.category}/products/${id}`}>
                  <h2 className={classes.outOfStockText}>Out Of Stock</h2>
                  <img src={gallery[0]} alt={name} />
                </Link>
              ) : (
                <>
                  <ImageGallery
                    images={gallery}
                    haveLink={1}
                    id={id}
                    category={this.props.category}
                  />
                  <button
                    className={classes.addButton}
                    data-testid={id}
                    onClick={() => {
                      if (!this.state.attribute && attributes.length > 0) {
                        this.setState({ showError: true });
                        return setTimeout(
                          () => this.setState({ showError: false }),
                          1000
                        );
                      }
                      this.props.dispatch(
                        cartActions.addProduct({
                          ...this.props.product,
                          quantity: 1,
                          attribute: this.state.attribute,
                          attributeName:
                            attributes.length > 0 ? attributes[0].name : null,
                        })
                      );

                      return this.setState({ attribute: null });
                    }}
                  >
                    <FontAwesomeIcon icon={faCartPlus} size="lg" />
                  </button>
                </>
              )}
            </div>

            <h2
              style={{
                textAlign: "left",
                marginLeft: "20px",
                marginTop: "20px",
                width: "75%",
                fontWeight: "lighter",
              }}
            >
              {name}
            </h2>
            <h4
              style={{
                textAlign: "left",
                marginLeft: "20px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {this.props.symbol}
              {this.props.price}
            </h4>

            {attributes.length > 0 &&
              attributes[0].items.map((item) => {
                if (attributes[0].type === "swatch") {
                  return (
                    <span
                      className={classes.colorDots}
                      key={item.id}
                      style={{ backgroundColor: item.value }}
                    />
                  );
                }
                return (
                  <button
                    className={`${classes.buttonGroup} ${
                      this.state.attribute === item.displayValue &&
                      classes.selected
                    } ${this.state.showError && classes.error}
                       
                      `}
                    onClick={() =>
                      this.setState({
                        showError: false,
                        attribute: item.displayValue,
                      })
                    }
                    key={item.id}
                  >
                    {item.displayValue}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Card);
