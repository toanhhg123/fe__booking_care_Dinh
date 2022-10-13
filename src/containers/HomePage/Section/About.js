import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Slider from 'react-slick';



class About extends Component {

    render() {
       return(
        <div className='section-share section-about'>
            <div className='section-about-header'>
                Truyền thông nói gì về Hospital
            </div>
            <div className='section-about-content'>
                <div className='content-left'>
                <iframe width="100%" height="400" 
                src="https://www.youtube.com/embed/0lGHEeEeUzY?list=RD284ebu-wuqc" 
                title="[Vietsub+Lyrics] You Don't Know Me - Ofenbach, Brodie Barclay" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                ></iframe>
                </div>
                <div className='content-right'>
                    <p>“ Trong một thế giới đang thay đổi rất nhanh chóng, lộ trình duy nhất đưa bạn đến thất bại là không dám mạo hiểm” – Mark Zuckerberg</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
