import { Component } from "react/cjs/react.production.min";
import { connect } from "react-redux";
import { cartActions } from "../store/cart-slice";
import classes from "./Product.module.css";
import parse from "html-react-parser";
import axios from "axios";
import Loader from "../shared/Loader";
import { GET_PRODUCT } from "../utils/graphql/queries/productQueries";

class Product extends Component {
  constructor() {
    super();
    this.manageAttributes = this.manageAttributes.bind(this);
    this.state = {
      current: 0,
      product: null,
      attributes: [],
      showError: false,
    };
  }
  addProductHandler() {
    if (this.state.attributes.length !== this.state.product.attributes.length) {
      this.setState({ showError: true });
      return setTimeout(() => this.setState({ showError: false }), 1000);
    }

    this.setState({ attributes: [] });
    return this.props.dispatch(
      cartActions.addProduct({
        ...this.state.product,
        quantity: 1,
        selectedAttributes: this.state.attributes,
      })
    );
  }
  manageAttributes(attribute, item) {
    this.setState((pre) => {
      const findAttribute = pre.attributes.find(
        (matchedAttribute) => matchedAttribute.name === attribute.name
      );
      const findAttributeIndex = pre.attributes.findIndex(
        (matchedAttribute) => matchedAttribute.name === attribute.name
      );
      let newArray;
      if (findAttribute) {
        newArray = [...pre.attributes];
        newArray[findAttributeIndex].value = item.displayValue;
      }
      return {
        attributes: findAttribute
          ? newArray
          : [
              ...pre.attributes,
              {
                name: attribute.name,
                value: item.displayValue,
              },
            ],
      };
    });
  }

  componentDidMount() {
    const pid = this.props.pid;
    axios({
      url: "http://localhost:4000/",
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(GET_PRODUCT(pid)),
    })
      .then((response) => {
        this.setState({
          product: response.data.data.product,
        });
      })
      .catch((err) => console.log(err));
  }

  attributesButtons() {
    return (
      this.state.product.attributes.length > 0 && (
        <div>
          {this.state.product.attributes.map((attribute) => {
            if (attribute.type === "swatch") {
              const error =
                !this.state.attributes.find(
                  (matchedAttribute) => matchedAttribute.name === attribute.name
                ) && this.state.showError;
              return (
                <div key={attribute.id}>
                  <h4 className={classes.attributeName}>{attribute.name}:</h4>
                  <div className={error ? classes.error : ""}>
                    {attribute.items.map((item) => {
                      return (
                        <button
                          style={{
                            backgroundColor: error ? "red" : item.value,
                          }}
                          className={`${classes.colorButtonGroup} ${
                            this.state.attributes.find(
                              (matchedAttribute) =>
                                matchedAttribute.value === item.displayValue &&
                                matchedAttribute.name === attribute.name
                            ) && classes.colorSelected
                          }
                 
                `}
                          onClick={() => this.manageAttributes(attribute, item)}
                          key={item.id}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
            const error =
              !this.state.attributes.find(
                (matchedAttribute) => matchedAttribute.name === attribute.name
              ) && this.state.showError;
            return (
              <div key={attribute.id}>
                <h4 className={classes.attributeName}>{attribute.name}:</h4>
                <div className={error ? classes.error : ""}>
                  {attribute.items.map((item) => {
                    return (
                      <button
                        className={`${classes.buttonGroup} ${
                          this.state.attributes.find(
                            (matchedAttribute) =>
                              matchedAttribute.value === item.displayValue &&
                              matchedAttribute.name === attribute.name
                          ) && classes.selected
                        }
                 
                `}
                        onClick={() => this.manageAttributes(attribute, item)}
                        key={item.id}
                      >
                        {item.displayValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )
    );
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
          {this.attributesButtons()}
          <div>
            <h4>PRICE:</h4>
            <h3>
              {matchCurrency.currency.symbol}
              {matchCurrency.amount}
            </h3>
          </div>
          <div className={classes.addButton}>
            {this.state.product.inStock ? (
              <button onClick={this.addProductHandler.bind(this)}>
                Add To Cart
              </button>
            ) : (
              <h2>Out Of Stock</h2>
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
