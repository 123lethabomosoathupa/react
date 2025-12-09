// Import React + Component for class-based components
import React, { Component } from 'react';

// Import filled and outlined star icons from react-icons library
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {
    constructor(props) {
        super(props);

        // Initialize component state using the rating passed as a prop
        this.state = { rating: this.props.rating };

        // Bind the event handler so "this" works correctly inside the method
        this.handleClick = this.handleClick.bind(this);
    }

    /*
        handleClick:
        - Updates the rating value in the state when a user clicks a star
        - React will automatically re-render the component after setState()
    */
    handleClick(ratingValue) {
        this.setState({ rating: ratingValue });
    }

    render() {
        return (
            <div style={styles.starStyle}>
                {/* Display the current rating number */}
                <h1>Rating: {this.state.rating}</h1>

                {/* 
                    Render 5 stars.
                    If the rating is greater than or equal to the star number,
                    show a filled star.
                    Otherwise, show an empty star.
                    Clicking a star updates the rating.
                */}

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

export default Rating;

// Inline style for the star wrapper (changes star color)
const styles = {
    starStyle: {
        color: 'orange'
    }
};
