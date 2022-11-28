import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createComment,
  getDetailInforDoctor,
} from "../../../services/userService";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { LANGUAGES } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import { getCommentByUserId } from "../../../services/userService";

class detailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
      commnets: [],
      userComment: {
        name: "",
        text: "",
      },
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      getCommentByUserId(this.props.match.params.id).then((res) => {
        this.setState({
          commnets: res,
        });
      });

      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log("check state: ", this.state);
    let { language } = this.state;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      // eslint-disable-next-line no-unused-vars
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      // eslint-disable-next-line no-unused-vars
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    const handleSubmitComment = (e) => {
      e.preventDefault();
      createComment({
        userId: this.props.match.params.id,
        ...this.state.userComment,
      }).then((res) => {
        this.setState({
          commnets: [res, ...this.state.commnets],
        });
      });
    };

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="container comment-doctor">
            <h3 className="p-3">Comments</h3>
            {this.state.commnets.map((x) => (
              <div className="alert alert-primary" key={x.id} role="alert">
                <h5>name: {x.name}</h5>
                {x.text}
              </div>
            ))}
            <form className="my-5" onSubmit={handleSubmitComment}>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Name:</label>
                <input
                  className="form-control"
                  value={this.state.userComment.name}
                  onChange={(e) =>
                    this.setState({
                      userComment: {
                        ...this.state.userComment,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">text</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) =>
                    this.setState({
                      userComment: {
                        ...this.state.userComment,
                        text: e.target.value,
                      },
                    })
                  }
                ></textarea>
              </div>
              <button className="btn btn-primary my-2">send</button>
            </form>
          </div>
        </div>
      </>
    );
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
