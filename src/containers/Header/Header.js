import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from '../../utils/constant';
import _ from 'lodash';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    handleChangeLanguage = (language) => {
       this.props.changeLanguageAppRedux(language)

    }

    render() {
        const { processLogout, userInfo } = this.props;
        let language = this.props.language;
        // console.log('check userInfo: ', this.props.userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'><FormattedMessage id='homeheader.welcome'/>, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !</span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
