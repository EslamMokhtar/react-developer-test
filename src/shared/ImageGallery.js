import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import classes from "./ImageGallery.module.css";

class ImageGallery extends Component {
  constructor() {
    super();
    this.nextHandler = this.nextHandler.bind(this);
    this.preHandler = this.preHandler.bind(this);
    this.state = {
      current: 0,
    };
  }
  nextHandler() {
    if (this.state.current + 1 === this.props.images.length) {
      return this.setState({ current: 0 });
    }
    this.setState((pre) => {
      return { current: pre.current + 1 };
    });
  }

  preHandler() {
    if (this.state.current === 0) {
      return this.setState({ current: this.props.images.length - 1 });
    }
    this.setState((pre) => {
      return { current: pre.current - 1 };
    });
  }
  render() {
    return (
      <>
        {this.props.images.map((item, index) => {
          return (
            <div
              className={`${classes.fade} ${
                this.state.current === index ? " " : classes.mySlides
              }`}
              key={index}
            >
              {this.props.haveLink ? (
                <Link to={`/${this.props.category}/products/${this.props.id}`}>
                  <img src={item} alt={this.props.id} />
                </Link>
              ) : (
                <img src={item} alt={this.props.id} />
              )}
            </div>
          );
        })}

        {this.props.images.length > 1 && (
          <div className={classes.buttons}>
            <button className={classes.prev} onClick={this.preHandler}>
              &#10094;
            </button>

            <button className={classes.next} onClick={this.nextHandler}>
              &#10095;
            </button>
          </div>
        )}
      </>
    );
  }
}

export default ImageGallery;
