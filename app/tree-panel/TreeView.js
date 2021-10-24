import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TreeButton from './TreeButton';
import TreeNodeList from './TreeNodeList';

import { collection, getDocs, getDoc, doc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore/lite';
import { db } from '../firestore.js';

import diagramXML from '../diagram.bpmn';

const TreeView = ({modeler}) => {

    const [nodes, setNodes] = useState([]);

    const dispatch = useDispatch();
    const isTreeView = useSelector(state => state.treeToggle);
    const isNewItemView = useSelector(state => state.newItemToggle);

    const itemIdRef = useRef(null);
    const itemNameRef = useRef(null);

    const loadNode = async () => {
        const q = query(collection(db, 'process'), orderBy("id"));
        const processSnapshot = await getDocs(q);
        setNodes(processSnapshot.docs.map(doc => Object.assign(doc.data(), { key: doc.id })));
    }

    const saveNode = (id, name) => {
        if(id && name){
            modeler.saveXML({ format: true }, async (err, xml) => {
                await addDoc(collection(db, "process"), { id, name, diagram: xml });
                loadNode();
            });            
        }
    }

    const deleteNode = async (key) => {
        await deleteDoc(doc(db, 'process', key));
        loadNode();
    }

    const openModeler = async (key) => {
        const docSnap = await getDoc(doc(db, 'process', key));
        let diagram = docSnap.data().diagram;
        if(!diagram) diagram = diagramXML;
        modeler.importXML(diagram);
    }

    const saveBtnClick = () => {
        dispatch({type:'newItemView/hide'});

        const id = itemIdRef.current.value;
        const name = itemNameRef.current.value;
        itemIdRef.current.value = '';
        itemNameRef.current.value = '';

        saveNode(id, name);
    }

    useEffect(() => {
        loadNode();
    }, []);

    
    return (
        <div>
            <TreeButton deleteNode={deleteNode} />
            {
                isTreeView &&
                <>
                    {
                        isNewItemView && 
                        <div className={"new-item-body"}>
                            <label htmlFor="item-id">ID:</label>
                            <input type="text" id="item-id" ref={itemIdRef} />
                            <label htmlFor="item-name">Name:</label>
                            <input type="text" id="item-name" ref={itemNameRef} />
                            <button className="saveBtn" onClick={saveBtnClick}><i className="fa fa-save"></i></button>
                        </div>
                    }
                    <div id="tree-body">
                        <TreeNodeList nodes={nodes} openModeler={openModeler} />
                    </div>
                </>
            }
        </div>
    );

};

export default TreeView;
