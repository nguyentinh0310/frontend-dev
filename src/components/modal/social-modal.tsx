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

export function SocailModal() {
  const schema = yup.object().shape({
    title: yup.string().required("Kinh nghiệm không để trống"),
    company: yup.string().required("Công ty không để trống"),
    from: yup.string().required("Vui lòng chọn thời gian"),
    to: yup.string().required("Vui lòng chọn thời gian"),
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
      twitter: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      github: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    try {
      // await profileApi.createExperience(values);
      // await mutateProfile();
      // setShow(false);
      // toast.success("Thêm kinh nghiệm thành công");
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <div className="experience-modal">
      <button className="btn btn-edit" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mạng xã hội khác</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="needs-validation"
            noValidate
          >
            <InputField
              name="facebook"
              control={control}
              placeholder="Facebook"
            />
            <InputField
              name="twitter"
              control={control}
              placeholder="Twitter"
            />
            <InputField
              name="instagram"
              control={control}
              placeholder="Instagram"
            />
            <InputField
              name="linkedin"
              control={control}
              placeholder="Linkedin"
            />
            <InputField name="github" control={control} placeholder="Github" />
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
