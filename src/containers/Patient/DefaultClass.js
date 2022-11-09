import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailInforDoctor } from "../../../services/userService";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { LANGUAGES } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class detailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(detailDoctor);
