import React, { Component } from "react";
// import { Redirect } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils/constant";
import "./HomeHeader.scss";
import { changeLanguageApp } from "../../store/actions/appActions";
// import Modal from "react-bootstrap/Modal";
import ModalCard from "../../components/ModalCard";
// import axios from "axios";
import { getAllClinic, getAllSpecialty } from "../../services/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {withRouter} from 'react-router';

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, data: [], title: "Doctors" };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleData = async (type) => {
    switch (type) {
      case "DOCTOR": {
        const res = await getAllSpecialty();
        console.log("check db: ", res);
        const data = res.data.map((x) => ({
          title: x.name,
          img: x.image,
          id: x.id,
          to: "/detail-specialty",
        }));

        this.setState({
          ...this.state,
          title: "Chuyên Khoa",
          show: true,
          data,
        });
        break;
      }

      case "HEALTH": {
        const res = await getAllClinic();
        const data = res.data.map((x) => ({
          title: x.name,
          img: x.image,
          id: x.id,
          to: "/detail-clinic",
        }));

        this.setState({
          ...this.state,
          title: "Cơ sở y tế",
          show: true,
          data,
        });
        break;
      }

      default: {
        break;
      }
    }
  };

  render() {
    let language = this.props.language;
    const { show, data, title } = this.state;

    console.log({ title });
    return (
      <React.Fragment>
        <ModalCard
          show={show}
          title={title}
          data={data}
          setShow={(check) => {
            this.setState({ ...this.setState, show: check });
          }}
        />
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.returnToHome()}>
                LOGO
              </div>
            </div>

            <div className="center-content">
              <div
                className="child-content"
                onClick={() => this.handleData("DOCTOR")}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleData("HEALTH")}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.healthy-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle">
                  <FormattedMessage id="homeheader.support" />
                </i>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm phòng khám" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
