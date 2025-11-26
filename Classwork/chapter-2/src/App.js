import React, { Component } from 'react';
import Products from './Products';
class App extends Component {
    render() {
        return (
            <div>
                <h1>My First React App!</h1>
                <Products />

            </div>
        );
    }
}

// class App extends Component {
//     formatName(user) {
//         return user.firstName + ' ' + user.lastName;
//     }
    
//     render() {
//         const user = {
//             firstName: 'Lethabo',
//             lastName: 'Mosoathupa'
//         };
//         return (
//             <div>
//                 <h1>Hello, {this.formatName(user)}</h1>
//             </div>
//         );
//     }
// }
export default App;