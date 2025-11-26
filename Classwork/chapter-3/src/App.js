import React, { Component } from 'react';
import Rating from './Rating';
import { Button } from 'react-bootstrap';
import Products from './Products';

class App extends Component {
    render() {
        const isValid = true;
        return (
            <div>
                <Products></Products>
                <Button variant="primary" disabled={!isValid}>Default</Button>
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