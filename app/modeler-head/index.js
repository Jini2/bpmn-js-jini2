import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import Modelerhead from './ModelerHead';

export default ({container, modeler, store}) => ReactDOM.render(
    <Provider store={ store }>
        <Modelerhead modeler={modeler} />
    </Provider>,
    container 
);;