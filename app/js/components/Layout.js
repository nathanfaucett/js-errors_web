import React, {
    Component
} from "react";
import {
    findDOMNode
} from "react-dom";
import {
    connect
} from "react-redux";
import domDimensions from "@nathanfaucett/dom_dimensions";
import Header from "./Header";
import Footer from "./Footer";


class Layout extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            offset: 0,
            height: 0
        };
    }

    componentDidMount() {
        this.getOffset(this.props.height);
    }

    componentDidUpdate() {
        const nextHeight = this.props.height;

        if (nextHeight !== this.state.height) {
            this.getOffset(nextHeight);
        }
    }

    getOffset(nextHeight) {
        this.setState({
            offset: (
                domDimensions.height(findDOMNode(this.refs.header)) +
                domDimensions.height(findDOMNode(this.refs.footer))
            ),
            height: nextHeight
        });
    }

    getStyles() {
        const styles = {
            body: {
                minHeight: (this.state.height - this.state.offset) + "px"
            }
        };
        return styles;
    }

    render() {
        const props = this.props;
        const styles = this.getStyles();

        return <div className="Layout">
            <Header ref="header"/>
            <div style={styles.body}>
                {props.children}
            </div>
            <Footer ref="footer"/>
        </div>;
    }
}


Layout.propTypes = {};


const mapDispatchToProps = ( /* dispatch */ ) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        height: state.size.height
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);