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

export function ExperienceModal() {
  const schema = yup.object().shape({
    title: yup.string().required("Kinh nghiệm không để trống"),
    company: yup.string().required("Công ty không để trống"),
    from: yup
      .date()
      .typeError("Vui lòng chọn thời gian bắt đầu")
      .required("Vui lòng chọn thời gian bắt đầu"),
    to: yup
      .date()
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
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      company: "",
      from: "",
      to: new Date,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    try {
      await profileApi.createExperience(values);
      await mutateProfile();
      setShow(false);
      reset({
        title: "",
        company: "",
        from: "",
        to: new Date,
      });
      toast.success("Thêm kinh nghiệm thành công");
      console.log(values);
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <div className="experience-modal">
      <button className="btn btn-edit" onClick={handleShow} type="button">
        <i className="fa-solid fa-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm kinh nghiệm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="needs-validation"
            noValidate
          >
            <InputField
              name="title"
              control={control}
              placeholder="Kinh nghiệm"
            />
            <InputField
              name="company"
              control={control}
              placeholder="Công ty"
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
