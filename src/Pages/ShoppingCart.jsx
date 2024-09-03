import React from 'react';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 3, // Number of items in the cart
      totalAmount: 132.00, // Total amount for the items in the cart
      discountCode: '', // State to store the discount code
    };
  }

  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {this.state.itemCount} items
                </div>
              </div>
            </div>
            {/* Render cart items */}
            {/* Replace this part with a dynamic rendering of cart items */}
            {/* You can map over the cart items and render each one */}
            {/* Example: */}
            {/* {cartItems.map((item, index) => (
              <div key={index} className="row border-top border-bottom">
                {/* Render item details here */}
                {/* Example: */}
                {/* <div className="row main align-items-center">
                  <div className="col-2">
                    <img className="img-fluid" src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="col">
                    <div className="row text-muted">{item.name}</div>
                    <div className="row">{item.description}</div>
                  </div>
                  <div className="col">
                    <a href="#">-</a><a href="#" className="border">{item.quantity}</a><a href="#">+</a>
                  </div>
                  <div className="col">&euro; {item.price.toFixed(2)} <span className="close">&#10005;</span></div>
                </div>
              </div>
            ))} */}
            <div className="back-to-shop">
              <a href="#">&leftarrow;</a>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                ITEMS {this.state.itemCount}
              </div>
              <div className="col text-right">
                &euro; {this.state.totalAmount.toFixed(2)}
              </div>
            </div>
            <form>
              <p>GIVE CODE</p>
              <input
                id="code"
                placeholder="Enter your code"
                value={this.state.discountCode}
                onChange={(e) => this.setState({ discountCode: e.target.value })}
              />
            </form>
            <div
              className="row"
              style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">
                &euro; {(this.state.totalAmount).toFixed(2)}
              </div>
            </div>
            <button className="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
