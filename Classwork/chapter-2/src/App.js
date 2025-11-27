// Import React and the Component class so we can create a class-based component
import React, { Component } from 'react';

// Import the Products component so we can display it inside App
import Products from './Products';

class App extends Component {
    // The render() method tells React what to display on the screen
    render() {
        return (
            <div>
                {/* Page title */}
                <h1>My First React App!</h1>

                {/* Render the Products component */}
                <Products />
            </div>
        );
    }
}


/* ------------------ OPTIONAL EXAMPLE BELOW (COMMENTED OUT) ------------------ */

// class App extends Component {
//     // A method that joins first and last name into one string
//     formatName(user) {
//         return user.firstName + ' ' + user.lastName;
//     }

//     render() {
//         // Example data we want to display
//         const user = {
//             firstName: 'Lethabo',
//             lastName: 'Mosoathupa'
//         };

//         return (
//             <div>
//                 {/* Use the formatName() method to display a dynamic greeting */}
//                 <h1>Hello, {this.formatName(user)}</h1>

//                 {/* Example of where Products could be rendered */}
//                 {/* <Products /> */}
//             </div>
//         );
//     }
// }

export default App;


// Chapter 2 Summary:
// - React uses components to build UI.
// - Create components with a class + render() method.
// - Components must return one root element.
// - Import and use components like <Products />.
// - Use { } to embed JS in JSX.
// - Use .map() to loop and display lists.
// - Always give list items a unique key.
