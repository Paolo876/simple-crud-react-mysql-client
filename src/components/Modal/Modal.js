import React from 'react';
import ReactDOM from 'react-dom';

import "./Modal.scss";

const Backdrop = ({onHide}) => <div className="modal-backdrop" onClick={ onHide }></div>;

const ModalOverlay = (props) => <div className="modal" style={props.style}>{props.children}</div>;

const Modal = (props) => 
    <>
        {ReactDOM.createPortal(<Backdrop onHide={props.onHide}/>, document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
    </>
;
 
export default Modal;