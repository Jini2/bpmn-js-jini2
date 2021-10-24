import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TreeButton = ({deleteNode}) => {

    const dispatch = useDispatch();

    const isTreeView = useSelector(state => state.treeToggle);
    const activeKey = useSelector(state => state.treeSelecter.key);

    const addBtnClick = () => {
        dispatch({type:'newItemView/show'});
    }
    
    const deleteBtnClick = () => {
        if(activeKey) deleteNode(activeKey);
    }

    const showTreeBtnClick = (flag) => {
        if(flag) dispatch({type:'treeView/show'});
        else dispatch({type:'treeView/hide'});
    }

    return (
        <div id="tree-btn">
            {
                isTreeView && 
                <>
                    <button className="addBtn" onClick={addBtnClick}><i className="fa fa-plus-square"></i></button>
                    <button className="deleteBtn" onClick={deleteBtnClick} ><i className="fa fa-trash"></i></button>
                    <button className="hideTreeBtn" onClick={()=>showTreeBtnClick(false)} ><i className="fa fa-angle-double-left"></i></button>
                </>
            }
            {
                !isTreeView && 
                <button className="showTreeBtn" onClick={()=>showTreeBtnClick(true)} ><i className="fa fa-angle-double-right"></i></button>
            }
        </div>
    );
};

export default TreeButton;