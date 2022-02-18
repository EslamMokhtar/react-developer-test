import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import ImageGallery from "../shared/ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../store/cart-slice";
import { connect } from "react-redux";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      isHovering: false,
      showError: false,
      attributes: [],
      clicked: 0,
      showAttributes: false,
    };
  }
  handleMouseOver() {
    this.setState(() => ({
      isHovering: true,
    }));
  }

  handleMouseOut() {
    this.setState(() => ({
      showAttributes: false,
      isHovering: false,
      clicked: 0,
    }));
  }
  addProductHandler(attributes) {
    if (
      this.state.clicked === 0 &&
      this.state.attributes.length !== attributes.length
    ) {
      this.setState({ showAttributes: true });
      return this.setState({ clicked: 1 });
    }
    if (this.state.attributes.length !== attributes.length) {
      this.setState({ showError: true });
      return setTimeout(() => this.setState({ showError: false }), 1000);
    }
    this.setState({ attributes: [] });
    return this.props.dispatch(
      cartActions.addProduct({
        ...this.props.product,
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
  attributesButtons(attributes, inStock) {
    return (
      attributes.length > 0 &&
      inStock &&
      attributes.map((attribute) => {
        if (attribute.type === "swatch") {
          const error =
            !this.state.attributes.find(
              (matchedAttribute) => matchedAttribute.name === attribute.name
            ) && this.state.showError;
          return (
            <div key={attribute.id} className={classes.attributeUnit}>
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
          <div key={attribute.id} className={classes.attributeUnit}>
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
      })
    );
  }
  render() {
    const { attributes, id, gallery, inStock, name } = this.props.product;
    return (
      <div className={classes.column}>
        <div
          className={`${classes.card} ${!inStock && classes.outOfStock} ${
            this.state.showAttributes && classes.expandCard
          }`}
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
        >
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
                    hover={this.state.isHovering}
                    images={gallery}
                    haveLink={1}
                    id={id}
                    category={this.props.category}
                  />
                  <button
                    className={classes.addButton}
                    data-testid={id}
                    onClick={this.addProductHandler.bind(this, attributes)}
                  >
                    {attributes.length > 0 && this.state.clicked === 0 ? (
                      <FontAwesomeIcon icon={faChevronCircleDown} size="lg" />
                    ) : (
                      <FontAwesomeIcon icon={faCartPlus} size="lg" />
                    )}
                  </button>
                </>
              )}
            </div>

            <h2 className={classes.productName}>{name}</h2>
            <h4 className={classes.productPrice}>
              {this.props.symbol}
              {this.props.price}
            </h4>
          </div>
            <div
              className={`${classes.attributesButtons} ${
                this.state.showAttributes ? classes.showAttributes : ""
              }`}
            >
              {this.attributesButtons(attributes, inStock)}
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Card);
