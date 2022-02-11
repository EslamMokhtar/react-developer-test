import { Component } from "react/cjs/react.production.min";
import classes from "./MainNavbar.module.css";
import { connect } from "react-redux";
import { currencyActions } from "../store/currency-slice";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const GET_CURRENCIES = {
  query: ` 
  {
    currencies{
      label
      symbol
    }
  }
  
  `,
};
class MainNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.chooseCurrency = this.chooseCurrency.bind(this);
    this.state = {
      dropdown: false,
      currncies: [],
      animate: false,
    };
  }
  chooseCurrency(item) {
    this.props.dispatch(currencyActions.changeCurrency(item));
    this.setState({ currency: item, dropdown: false });
  }
  toggleDropDown() {
    this.props.onCloseModal();
    this.setState((curState) => {
      return { dropdown: !curState.dropdown };
    });
  }
  componentDidMount() {
    axios({
      url: "http://localhost:4000/",
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(GET_CURRENCIES),
    })
      .then((response) => {
        this.setState({ currncies: response.data.data.currencies });
      })
      .catch((err) => console.log(err));
  }
  componentDidUpdate(pre) {
    if (pre.items !== this.props.items) {
      this.setState({ animate: true });
      return setTimeout(() => this.setState({ animate: false }), 400);
    }
  }

  render() {
    const total = this.props.items.map((item) => {
      return item.quantity;
    });
    const reducerQuantity = (pre, curr) => pre + curr;
    const totalQuantity = total.reduce(reducerQuantity, 0);
    return (
      <header className={classes.header}>
        <nav>
          <ul className={classes.links}>
            {["all", "clothes", "tech"].map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={`/${item}`}
                    activeStyle={{
                      color: "#5ece7b",
                      transition: "0.4s ease-out",
                      borderBottom: "2px solid #5ece7b",
                      paddingBottom: "20px",
                    }}
                  >
                    {item}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Link to="/">
            <FontAwesomeIcon
              icon={faShoppingBag}
              size="2x"
              color="#5ece7b"
              className={classes.logo}
            />
          </Link>
          <div className={classes.navIcons}>
            <div onClick={this.toggleDropDown} className={classes.chevron}>
              <h3 style={{ marginRight: "5px" }}>
                {this.props.currency.symbol}
              </h3>
              <FontAwesomeIcon
                icon={this.state.dropdown ? faChevronUp : faChevronDown}
                size="xs"
              />
            </div>
            <div
              className={`${classes.modal} ${
                !this.state.dropdown && classes.close
              }`}
            >
              <div
                className={classes.overlayDrop}
                onClick={() => this.setState({ dropdown: false })}
              />
              <ul
                className={`${classes.dropdownContent} ${
                  !this.state.dropdown && classes.close
                }`}
              >
                {this.state.currncies.map((item, index) => {
                  return (
                    <li
                      onClick={this.chooseCurrency.bind(null, item)}
                      key={index}
                      className={
                        this.props.currency.label === item.label
                          ? classes.selectedCurrency
                          : ""
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <h3>{item.symbol}</h3>
                        <h4 style={{ fontWeight: "normal" }}>{item.label}</h4>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className={classes.shopping}
              onClick={() => {
                this.setState({ dropdown: false });
                this.props.onClickModal();
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />

              {totalQuantity > 0 && (
                <span
                  className={`${classes.badge} ${
                    this.state.animate && classes.animate
                  }`}
                >
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  items: state.cart.items,
});
export default connect(mapStateToProps)(MainNavbar);
