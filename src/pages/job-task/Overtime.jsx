
import Statistics from "../apps/Projects/Detail/Statistics";
import { Row, Col, Card, Dropdown, Modal, Button, Form } from "react-bootstrap";

// components
import Table from "../../components/Table";

//dummy data
import { overtimeData as data, } from "../tables/data";
import { FormInput } from "../../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ShreyuDatepicker from "../../components/Datepicker";
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

const Overtime = () => {

    const [show, setShow] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const onOpenModal = () => setShow(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

  /*
   * handle date change
   */
  const onDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

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
            Header: "Name",
            accessor: "name",
            sort: true,
        },
        {
            Header: "OT Date",
            accessor: "OTDate",
            sort: true,
        },
        {
            Header: "OT Hours",
            accessor: "OTHours",
            sort: true,
        },
        {
            Header: "OT Tyoe",
            accessor: "OTType",
            sort: true,
        },
        {
            Header: "Description",
            accessor: "description",
            sort: true,
        },
        {
            Header: "Status",
            accessor: "status",
            sort: true,
        },
        {
            Header: "ApprovedBy",
            accessor: "approvedBy",
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
                                    <h4 className="header-title">OVERTIME </h4>
                                    <p className="text-muted fs-14 mb-4">A Table allowing search</p>
                                </div>
                                <button onClick={createNewDepartment} className="btn btn-primary h-50">Add OVERTIME </button>
                            </div>

                            <Row>
                                <Col xs={12}>
                                    <Card>
                                        <Card.Body className="p-0">
                                            <h6 className="card-title border-bottom p-3 mb-0 header-title">
                                                Overtime Overview
                                            </h6>
                                            <Row className="py-1">
                                                <Col sm={6} xl={3}>
                                                    <Statistics
                                                        icon="users"
                                                        stats="12 this month"
                                                        description="Overtime Employee
                    "
                                                    />
                                                </Col>
                                                <Col sm={6} xl={3}>
                                                    <Statistics
                                                        icon="clock"
                                                        stats="118"
                                                        description="Overtime Hours"
                                                    />
                                                </Col>
                                                <Col md={6} xl={3}>
                                                    <Statistics
                                                        icon="grid"
                                                        stats="23"
                                                        description="Pending Request"
                                                    />
                                                </Col>
                                                <Col sm={6} xl={3}>
                                                    <Statistics
                                                        icon="check-square"
                                                        stats="5"
                                                        description="Rejected"
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
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
                        <h5>{isDelete ? '' : isEditable ? "Edit Overtime" : "Add Overtime"}</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 pb-4 pt-0">
                    {
                        isDelete ? <>
                            <Col xs={8} className="text-end float-start">
                                <div>
                                    <h4 className="header-title"> Delete Add Overtime</h4>
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

                            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmitEvent)}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                            Select Employee 
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Select>
                                                    <option>John Deo</option>
                                                    <option>Richard Miles</option>
                                                    <option>John Smith</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-date">
                                            Overtime Date
                                            </Form.Label>
                                            <Col lg={10}>
                                                <ShreyuDatepicker
                                                    hideAddon={true}
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        onDateChange(date);
                                                    }}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-overtime-hour">
                                                Overtime Hours
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="number"
                                                    id="example-overtime-hour"
                                                    name="example-overtime-hour"
                                                    placeholder="Overtime Hours"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-textarea">
                                                Description
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control as="textarea" rows={5} id="example-textarea" />
                                            </Col>
                                        </Form.Group>


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
                                            {isEditable ? "Save" : "Add Add Overtime"}
                                        </Button>
                                    </Col>

                                </Row>
                            </Form>
                    }

                </Modal.Body>
            </Modal>
        </>
    );
};

export default Overtime;