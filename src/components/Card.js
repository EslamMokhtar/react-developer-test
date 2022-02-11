import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import ImageGallery from "../shared/ImageGallery";

class Card extends Component {
  render() {
    return (
      <div className={classes.column}>
        <div
          className={`${classes.card} ${
            !this.props.inStock && classes.outOfStock
          }`}
        >
          <div className={classes.content}>
            <div className={classes.profile}>
              {!this.props.inStock ? (
                <Link to={`/${this.props.category}/products/${this.props.id}`}>
                  <h2 className={classes.outText}>Out Of Stock</h2>
                  <img src={this.props.images[0]} alt={this.props.name} />
                </Link>
              ) : (
                <ImageGallery
                  images={this.props.images}
                  haveLink={1}
                  name
                  id={this.props.id}
                  category={this.props.category}
                />
              )}
            </div>

            <h2
              style={{
                textAlign: "left",
                marginLeft: "20px",
                marginTop: "20px",
                fontWeight: "lighter",
              }}
            >
              {this.props.name}
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
            {this.props.attributes[0] &&
              this.props.attributes[0].type === "swatch" &&
              this.props.attributes[0].items.map((item) => (
                <span
                  className={classes.dot}
                  key={item.id}
                  style={{ backgroundColor: item.value }}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
