
import { Row, Col, Card, Dropdown, Modal, Button } from "react-bootstrap";

// components
import Table from "../../components/Table";

//dummy data
import { designationsData as data, } from "../tables/data";
import { FormInput } from "../../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
console.log(data)



const sizePerPageList = [
    {
        text: "5",
        value: 5,
    },
    {
        text: "10",
        value: 10,
    },
    {
        text: "25",
        value: 25,
    },
    {
        text: "All",
        value: data.length,
    },
];

const Designations = () => {

    const [show, setShow] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const onOpenModal = () => setShow(true);

    const createNewDepartment = () => {
        setIsEditable(false);
        onOpenModal();
    };
    const onCloseModal = () => {
        setShow(false);
        setIsEditable(false);
        setIsDelete(false)
    };

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();

    const onSubmitEvent = (data) => {
        console.log(data.title);
    };

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            sort: true,
        },
        {
            Header: "Department",
            accessor: "departmentName",
            sort: true,
        },
        {
            Header: "Designation",
            accessor: "Designation",
            sort: true,
        },
        {
            Header: "Action",
            accessor: '',
            sort: false,
            Cell: ({ row }) => (
                <Dropdown className="float-start" align="start">
                    <Dropdown.Toggle
                        as="a"
                        className="cursor-pointer text-muted arrow-none"
                    >
                        <i className="uil uil-ellipsis-v fs-14"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setIsEditable(!isEditable); onOpenModal(); }}>
                            <i className="uil uil-edit-alt me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => { setIsDelete(!isDelete); onOpenModal(); }} className="text-danger">
                            <i className="uil uil-trash me-2"></i>Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        },
    ];

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="header-title">Designations</h4>
                                    <p className="text-muted fs-14 mb-4">A Table allowing search</p>
                                </div>
                                <button onClick={createNewDepartment} className="btn btn-primary h-50">Add Designations</button>
                            </div>

                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={onCloseModal}
                backdrop="static" keyboard={false}>
                <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                    <Modal.Title id="modal-title">
                        <h5>{isDelete ? '' : isEditable ? "Edit Designations" : "Add New Designations" }</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 pb-4 pt-0">
                    {
                        isDelete ? <>
                            <Col xs={8} className="text-end float-start">
                            <div>
                                <h4 className="header-title"> Delete Designations</h4>
                                <p className="text-muted fs-14 mb-4">Are you sure want to delete?</p>
                            </div>
                                <Button className="btn btn-light me-1" onClick={onCloseModal}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={onCloseModal}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </Button>
                            </Col>
                        </> :

                            <form
                                noValidate
                                name="chat-form"
                                id="chat-form"
                                onSubmit={handleSubmit(onSubmitEvent)}
                            >
                                <Row>
                                    <Col sm={12}>
                                        <FormInput
                                            type="text"
                                            label="Designations Name *"
                                            name="title"
                                            className="form-control"
                                            placeholder="Department Name"
                                            containerClass={"mb-3"}
                                            register={register}
                                            key="title"
                                            errors={errors}
                                            control={control}
                                        />
                                    </Col>
                                    <Col sm={12}>
              <FormInput
                type="select"
                label="Department"
                name="className"
                className="form-control"
                containerClass={"mb-3"}
                register={register}
                key="className"
                errors={errors}
                control={control}
              >
                <option value="webDevelopment">Web Development</option>
                <option value="itManagement">It Management</option>
                <option value="marking">Marking</option>
              </FormInput>
            </Col>

                                </Row>

                                <Row>
                                    <Col xs={12} className="text-end float-start">
                                        <Button className="btn btn-light me-1" onClick={onCloseModal}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            {isEditable ? "Save" : "Add Designations"}
                                        </Button>
                                    </Col>

                                </Row>
                            </form>
                    }

                </Modal.Body>
            </Modal>

        </>
    );
};

export default Designations;