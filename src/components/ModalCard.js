import { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { path } from "../utils/constant";

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { show, setShow, data, title } = this.props;
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
                  width={300}
                  height={200}
                  style={{
                    backgroundImage: `url(${x.img})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  src={data.img}
                  onError={({ currentTarget }) => {
                    currentTarget.src =
                      "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg";
                  }}
                  alt=""
                />
                <Link to={`${x.to}/${x.id}`} className="fs-5 mx-4">
                  {x.title}{" "}
                </Link>
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
