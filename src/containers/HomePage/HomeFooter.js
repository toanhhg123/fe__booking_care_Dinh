import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Slider from 'react-slick';



class About extends Component {

    render() {
       return(
        <div className='home-footer'>
            <p>&copy; 2022 Hospital with everyone.Thanks you very much! <a href='https://github.com/luyen1320'> &#8594; Click here &#8592;</a></p>
        </div>
       )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
