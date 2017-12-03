import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
// import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';


// const Root = () => {
//   return (
//     <BrowserRouter>
//       <div>
//         <Match exactly pattern="/" component={App} />
//         {/* <Match pattern="/chain" component={App} /> */}
//         <Miss component={NotFound} />
//       </div>
//     </BrowserRouter>
//   )
// }
// ReactDOM.render(<Root />, document.getElementById('main'));

ReactDOM.render(<App />, document.getElementById('main'));

