
import { Html5QrcodeScanner } from "html5-qrcode";
import React from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  fps: number
  qrbox: number
  supportedScanTypes: []
  qrCodeSuccessCallback: any
  qrCodeErrorCallback: any
}

class Html5QrcodePlugin extends React.Component {
    html5QrcodeScanner: Html5QrcodeScanner
    props: Html5QrcodePluginProps
    render() {
        return <div id={qrcodeRegionId} />;
    }

    componentWillUnmount() {
        // TODO(mebjas): See if there is a better way to handle
        //  promise in `componentWillUnmount`.
        this.html5QrcodeScanner.clear().catch(error => {
            console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    }

    componentDidMount() {
        // Creates the configuration object for Html5QrcodeScanner.
        function createConfig(props: Html5QrcodePluginProps) {
            var config = {} as Html5QrcodePluginProps;
            if (props.fps) {
            config.fps = props.fps;
            }
            if (props.qrbox) {
            config.qrbox = props.qrbox;
            }

            return config;
        }

        const config = createConfig(this.props);
        const verbose = true;

        // Suceess callback is required.
        if (!(this.props.qrCodeSuccessCallback )) {
            throw "qrCodeSuccessCallback is required callback.";
        }

        this.html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId, config, verbose);
        this.html5QrcodeScanner.render(
            this.props.qrCodeSuccessCallback,
            this.props.qrCodeErrorCallback);
    }
};

export default Html5QrcodePlugin;