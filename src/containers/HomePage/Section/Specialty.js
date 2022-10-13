import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import specialtyIMG from '../../assets/specialty/tim-mach.jpg'
class Specialty extends Component {


    render() {
       return(
        <div className='section-share section-specialty'>
            <div className='section-container'>
              <div className='section-header'>
                <span className='title-section'>Chuyên khoa phổ biến</span>
                <button className='btn-section'>Xem thêm</button>
              </div>
              <div className='section-body'>
              <Slider {...this.props.settings}>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
                <div className='specialty-customize'>
                  <div className='bg-image'/>
                  <div>Tim mach 1</div>
                </div>
              </Slider>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
