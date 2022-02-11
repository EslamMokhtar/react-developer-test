import { Component } from "react/cjs/react.production.min";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";
import classes from "./Product.module.css";
import parse from "html-react-parser";
import axios from "axios";
import Loader from "../shared/Loader";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      product: null,
      attribute: null,
      showError: false,
    };
  }

  componentDidMount() {
    const pid = this.props.pid;
    const GET_PRODUCT = {
      query: `
      {
        product(id: "${pid}") {
          id
          name
          inStock
          gallery
          description
          category
          brand
          prices{
            currency{
              label
              symbol
            }
            amount
          }
          attributes {
            id
            name
            type
            items {
              id
              displayValue
              value
            }
          }
        }
      }
    
      `,
    };
    axios({
      url: "http://localhost:4000/",
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(GET_PRODUCT),
    })
      .then((response) => {
        this.setState({ product: response.data.data.product });
      })
      .catch((err) => console.log(err));
  }
  render() {
    if (!this.state.product) {
      return <Loader />;
    }
    const matchCurrency = this.state.product.prices.find(
      (price) => price.currency.label === this.props.currency.label
    );
    return (
      <div className={classes.container}>
        <div className={classes.leftColumn}>
          <div className={classes.imageGroup}>
            {this.state.product.gallery.length > 1 &&
              this.state.product.gallery.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt={index}
                    className={
                      index === this.state.current ? classes.selected : ""
                    }
                    key={index}
                    onClick={() => this.setState({ current: index })}
                  />
                );
              })}
          </div>

          <div className={classes.bigImage}>
            {this.state.product.gallery.map((image, index) => {
              return (
                <img
                  alt={index}
                  src={image}
                  className={`${classes.fade}
                    ${index === this.state.current ? "" : classes.hide}`}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.rightColumn}>
          <div>
            <h1>{this.state.product.brand}</h1>
            <h1 style={{ fontWeight: "lighter" }}>{this.state.product.name}</h1>
          </div>
          {this.state.product.attributes.length > 0 && (
            <div>
              <h4 style={{ textTransform: "uppercase" }}>
                {this.state.product.attributes[0].name}
              </h4>
              <div>
                {this.state.product.attributes[0].items.map((item) => {
                  if (this.state.product.attributes[0].type === "swatch") {
                    return (
                      <button
                        style={{ backgroundColor: item.value }}
                        className={`${classes.colorButtonGroup} ${
                          this.state.attribute === item.displayValue &&
                          classes.colorSelected
                        }
                       
                      `}
                        onClick={() =>
                          this.setState({
                            attribute: item.displayValue,
                            showError: false,
                          })
                        }
                        key={item.id}
                      />
                    );
                  }
                  return (
                    <button
                      className={`${classes.buttonGroup} ${
                        this.state.attribute === item.displayValue &&
                        classes.selected
                      }
                       
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
          )}
          <div>
            <h4 style={{ paddingBottom: "10px" }}>PRICE:</h4>
            <h3>
              {matchCurrency.currency.symbol}
              {matchCurrency.amount}
            </h3>
          </div>
          <div className={classes.addButton}>
            {this.state.product.inStock ? (
              <button
                onClick={() => {
                  if (
                    !this.state.attribute &&
                    this.state.product.attributes.length > 0
                  ) {
                    return this.setState({ showError: true });
                  }
                  return this.props.dispatch(
                    cartActions.addProduct({
                      ...this.state.product,
                      quantity: 1,
                      attribute: this.state.attribute,
                      attributeName: this.state.product.attributes[0].name,
                    })
                  );
                }}
              >
                Add To Cart
              </button>
            ) : (
              <h2>Out Of Stock</h2>
            )}
            {this.state.showError && (
              <p style={{ color: "red", margin: "5px 0" }}>
                Please Choose a {this.state.product.attributes[0].name}!
              </p>
            )}
          </div>
          <div className={classes.description}>
            {parse(this.state.product.description)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});
export default connect(mapStateToProps)(Product);
