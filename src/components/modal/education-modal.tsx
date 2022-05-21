import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { DateField, InputField } from "../common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useProfile } from "@/hooks";
import { useRouter } from "next/router";
import { profileApi } from "@/api-client/profile-api";
import { toast } from "react-toastify";

export function EducationModal() {
  const schema = yup.object().shape({
    school: yup.string().required("Trường học không để trống"),
    from: yup.date().required("Vui lòng chọn thời gian bắt đầu"),
    to: yup
      .date()
      .required("Vui lòng chọn thời gian kết thúc")
      .min(yup.ref("from"), "Ngày kết thúc lơn hơn ngày bắt đầu"),
  });

  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);

  const { mutateProfile } = useProfile(id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      school: "",
      from: "",
      to: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    try {
      await profileApi.createEducation(values);
      await mutateProfile();
      setShow(false);
      toast.success("Thêm học vấn thành công");
    } catch (error) {
      toast.error("Lỗi 400");
    }
  };

  return (
    <div className="education-modal">
      <button className="btn btn-edit" onClick={handleShow} type="button">
        <i className="fa-solid fa-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm học vấn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="needs-validation"
            noValidate
          >
            <InputField
              name="school"
              control={control}
              placeholder="Trường học"
            />
            <div className="mb-2 row">
              <div className="col-md-6">
                <label>Bắt đầu</label>
                <DateField name="from" control={control} />
              </div>
              <div className="col-md-6">
                <label>Tới</label>
                <DateField name="to" control={control} />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={isSubmitting}
              >
                Xác nhận&nbsp;
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
