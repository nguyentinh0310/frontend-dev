import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export function EducatioModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="education-modal">
      <button className="btn btn-edit" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm học vấn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-2">
              <label>Trường học</label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Xác nhận
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
