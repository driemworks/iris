import React from "react";
import ReactDOM from 'react-dom';

import EthService from '../../service/eth.service';
import {IPFSDatabase} from '../../db/ipfs.db';
import { If, Else } from 'rc-if-else';
import { EncryptionService } from '../../service/encrypt.service';
import { UserService } from '../../service/user.service';
import { box } from 'tweetnacl';
import { decodeBase64 } from 'tweetnacl-util';

import { Modal, ModalHeader, ModalBody, ModalFooter,
          Alert, Button, ButtonDropdown, DropdownToggle, 
          DropdownMenu, DropdownItem
        } from 'reactstrap';
import { faTimesCircle, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import store from '../../state/store/index';
import { addToQueue, removeFromQueue } from '../../state/actions/index';

import { encode } from '@stablelib/base64'

import './upload.component.css';
import UploadQueueComponent from "./queue/upload-queue.component";
import { HD_PATH_STRING, uploadDirectory, inboxDirectory, publicKeyDirectory, localStorageConstants } from "../../constants";


import lightwallet from 'eth-lightwallet';

class UploadComponent extends React.Component {

    files = [];

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            uploadQueue: []
        };
        store.subscribe(() => {
            this.setState({ uploadQueue: store.getState().uploadQueue });
        });
    }

    uploadFile(event) {
        this.captureFile(event);
        this.onIPFSSubmit();
    }

    /**
     * Upload a file
     * @param event 
     */
    async captureFile(event) {
        event.stopPropagation();
        event.preventDefault();

        const file = await event.target.files[0];
        console.log('file as string ' + btoa(file));
        this.setState({ uploadingFile: true, file: file });

        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => { this.convertToBuffer(reader); }
        this.setState({uploadFileName: file.name, uploadingFile: false });
    }

    /**
     * convert the reader to a buffer and set the state
     */
    convertToBuffer = async(reader) => {
        const buffer = Buffer.from(reader.result);
        this.setState({buffer: buffer});
        this.forceUpdate();
    }

    /**
     * Add the uploaded file to IPFS
     */
    async onIPFSSubmit() {
        await this.encryptAndUploadFile('test', encode(this.state.buffer));
    }

    async encryptAndUploadFile(password, data) {
        EthService.ethereumAccountFunction(password, async (ks, pwDerivedKey, address) => {
            // get your own public key
            const publicKey = lightwallet.encryption.addressToPublicEncKey(ks, pwDerivedKey, address);
            const publicKeyArray = [publicKey];
            // encrypt for yourself
            const entryptedData = lightwallet.encryption.multiEncryptString(ks, pwDerivedKey, data, address, publicKeyArray)['symEncMessage'];
            const dir = uploadDirectory(address);
            await this.addFile(dir, Buffer.from(entryptedData));
        });
    }

    async addFile(dir, content) {
        await IPFSDatabase.addFile(dir, content, this.state.uploadFileName,
            (err, res) => {
                if (err) {
                    alert(err);
                } else {
                    this.setState({ recipientPublicKey: '' });
                }
            }
        );
    }

    clearFile() {
        this.setState({ file: null, enableEncryption: false, accountSelected: false });
    }

    render() {
        this.clearFile    = this.clearFile.bind(this);
        this.onIPFSSubmit = this.onIPFSSubmit.bind(this);
        return (
            <div className="upload-container">
                <div className="send-message-container">
                    <div className="file-selector">
                        <input type="file" id="file" className="file-chooser" onChange={this.captureFile.bind(this)} />
                        <label for="file" className="file-chooser-label">Select File</label>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<UploadQueueComponent />, document.getElementById('root'));
export default UploadComponent;
