import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// common components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
// custom components
import TableContainer from "./components/TableContainer";
// utils
import capitalizeFirstLetter from "../../../utils/stringManipulation/capitalizeFirstLetter";
import getUrlParameter from "../../../utils/getUrlParameter";
// actions
import { startGetStorage } from "../../../actions/storage";

class Storage extends Component {
  componentDidMount() {
    this.getStorage();
  }

  // Api calls ----------------------------
  getStorage = () => {
    const { match, startGetStorage } = this.props;
    const storageType = getUrlParameter("type");
    const id = match.params.id;
    startGetStorage(id, storageType);
  };

  render() {
    const { loading, storage } = this.props;
    const storageType = getUrlParameter("type");

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!storage) {
      console.log("no storage");
    } else {
      console.log("storage", storage);
      content = storage && (
        <Fragment>
          <TableContainer storage={storage} storageType={storageType} />
        </Fragment>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getStorage} />
        <Heading title={`View ${capitalizeFirstLetter(storageType)}`} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  storage: storage.storage,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { startGetStorage }
)(Storage);
