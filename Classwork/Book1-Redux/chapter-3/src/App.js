// Import React and the Component class for creating a class-based component
import React, { Component } from 'react';

// Import the Rating component for displaying star ratings
import Rating from './Rating';

// Import a Button component from React Bootstrap for styled buttons
import { Button } from 'react-bootstrap';

// Import the Products component to display a list of products
import Products from './Products';

class App extends Component {
    render() {

        // Boolean value used to enable or disable the button
        const isValid = true;

        return (
            <div>

                {/* Render the Products list */}
                <Products />

                {/* 
                    Render a Bootstrap button.
                    The button is disabled when isValid is false.
                    In this case, isValid = true, so the button is enabled.
                */}
                <Button variant="primary" disabled={!isValid}>Default</Button>

                {/* Render multiple Rating components with different rating values */}
                <Rating rating={1} />
                <Rating rating={2} />
                <Rating rating={3} />
                <Rating rating={4} />
                <Rating rating={5} />

            </div>
        );
    }
}

export default App;
