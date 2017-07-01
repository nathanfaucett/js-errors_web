import React, {
    Component
} from "react";
import extend from "@nathanfaucett/extend";


class Wrapper extends Component {

    getStyles() {
        const styles = {
            root: {
                position: "relative",
                maxWidth: "960px",
                padding: "0px 20px",
                margin: "0 auto"
            }
        };
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const className = this.props.className ? this.props.className + " Wrapper" : "Wrapper";
        const id = this.props.id ? this.props.id : "";
        return <div id={id} className={className} style={extend(styles.root, this.props.style)}>{this.props.children}</div>;
    }
}


export default Wrapper;