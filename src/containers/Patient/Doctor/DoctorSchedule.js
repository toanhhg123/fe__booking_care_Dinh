import React, { Component } from 'react';
import { connect } from "react-redux";
import { getScheduleDoctorByDate } from '../../../services/userService';
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import {LANGUAGES} from '../../../utils/constant';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })

        // console.log('monent vie: ',moment(new Date()).format('dddd - DD/MM'));
        // console.log('monent en: ',moment(new Date()).locale('en').format('ddd - DD/MM'));
        // this.setArrDays(language);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for(let i=0; i< 7;i++){
            let object = {};
            if(language === LANGUAGES.VI){
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }else{
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            }else{
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }
  
    handleOnchangeSelect = async (event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res= await getScheduleDoctorByDate(doctorId, date);
            console.log("check res schedule: ",res);

            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
            console.log("check res schele: ",res)
        }
    }

    render() {
        let {allDays, allAvalableTime} = this.state;
        let {language} = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return(
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'><span><FormattedMessage id='patient.detail-doctor.schedule'/></span></i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                        item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return(
                                                <button 
                                                    key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                >{timeDisplay}</button>
                                            )
                                        })
                                    }
                                </div>

                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.choose'/>
                                        <i className='far fa-hand-point-up'></i>
                                        <FormattedMessage id='patient.detail-doctor.book-free'/>
                                    </span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage  id='patient.detail-doctor.no-schedule'/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
