import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// common components
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Heading from "../../../components/Heading";
// custom components
import StoragesTable from "./components/StoragesTable";
// actions
import { startGetStorages } from "../../../actions/storage";

class Storages extends Component {
  componentDidMount() {
    this.props.startGetStorages();
  }

  render() {
    const { loading, storages } = this.props;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!storages || storages.length < 1) {
      console.log("no storage");
    } else {
      content = (
        <div className="row">
          {storages.map((storage, i) => (
            <StoragesTable key={i} storage={storage} />
          ))}
        </div>
      );
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Storages" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, storage }) => ({
  loading: ui.loading,
  storages: storage.storages
});

export default connect(
  mapStateToProps,
  { startGetStorages }
)(Storages);
