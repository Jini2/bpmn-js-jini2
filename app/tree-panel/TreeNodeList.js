import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TreeNodeList = ({nodes, openModeler}) => {

    const dispatch = useDispatch();
    const activeKey = useSelector(state => state.treeSelecter.key);

    const onClickNode = (e, key) => {
        const $target = e.currentTarget;
        dispatch({type: 'treeSelect/active', payload: {key, title:$target.innerText}});
        openModeler(key);
    }

    return (
        <ul>
        {
            nodes.map(node => 
                <li key={node.key} className={node.key == activeKey ? "active" : "" } onClick={(e) => onClickNode(e, node.key)}>
                    <i className="fa fa-file-powerpoint-o"></i>{node.id}[{node.name}]
                </li>)
        }
        </ul>
    );
};

export default TreeNodeList;