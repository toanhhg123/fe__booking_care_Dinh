import { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { path } from "../utils/constant";

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { show, setShow, data, title } = this.props;
    console.log(this.props);
    return (
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {[
            ...data.map((x, i) => (
              <div key={i} className="d-flex border shadow p-1 round">
                <img
                  width={200}
                  src={data.img}
                  onError={({ currentTarget }) => {
                    currentTarget.src =
                      "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg";
                  }}
                  alt=""
                />
                <p className="fs-5 mx-4">{x.title} </p>
                <span>{x.desc}</span>
              </div>
            )),
          ]}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalCard;
