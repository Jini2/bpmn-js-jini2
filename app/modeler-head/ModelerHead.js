import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firestore.js';

const Modelerhead = ({modeler}) => {

    const keyRef = useRef();
    
    const dispatch = useDispatch();
    const { activeKey, activeTitle } = useSelector(state => ({ 
        activeKey: state.treeSelecter.key,
        activeTitle: state.treeSelecter.title
    }));

    const saveModeler = async (err, xml) => {
        const key = keyRef.current.value;
        if(!key){
            dispatch({type:'treeView/show'});
            dispatch({type:'newItemView/show'});
            return;
        }
        const processRef = doc(db, "process", key);
        await updateDoc(processRef, {diagram : xml}).catch(() => {
            alert("error in fatching modeler");
        });
        alert("Saved successfully.");
    }

    const saveDiagram = (done) => {
        modeler.saveXML({ format: true }, (err, xml) => {
          done(err, xml);
        });
    }

    return (
        <>
            <span id="head-title">{activeTitle}</span>
            <input className="modeler-key" type="hidden" ref={keyRef} value={activeKey} />
            <button id="saveModelerBtn" onClick={() => saveDiagram(saveModeler)}><i className="fa fa-save"></i></button>
        </>)
}

export default Modelerhead;