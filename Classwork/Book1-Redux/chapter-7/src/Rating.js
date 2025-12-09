// Import React and Component for class-based components
import React, { Component } from 'react';

// Import filled and outlined star icons from react-icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {
    constructor(props) {
        super(props);

        // Initialize state with rating received as a prop
        this.state = { rating: this.props.rating };

        // Bind the event handler to ensure 'this' refers to the component instance
        this.handleClick = this.handleClick.bind(this);
    }

    /*
        handleClick:
        - Updates the rating in the state when a user clicks a star
        - React re-renders the component automatically after state changes
    */
    handleClick(ratingValue) {
        this.setState({ rating: ratingValue });
    }

    render() {
        return (
            <div style={styles.starStyle}> 
                {/* Display the current numeric rating */}
                <h1>Rating: {this.state.rating}</h1>

                {/* Display 5 stars */}
                {this.state.rating >= 1 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 1)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 1)} />
                )}

                {this.state.rating >= 2 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 2)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 2)} />
                )}

                {this.state.rating >= 3 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 3)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 3)} />
                )}

                {this.state.rating >= 4 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 4)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 4)} />
                )}

                {this.state.rating >= 5 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 5)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 5)} />
                )}
            </div>
        );
    }
}

// Export Rating component to be used in other components
export default Rating;

// Inline styles for the stars
const styles = {
    starStyle: {
        color: 'orange' // Makes all stars orange
    }
};
