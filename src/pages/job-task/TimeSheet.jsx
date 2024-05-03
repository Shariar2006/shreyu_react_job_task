import { Row, Col, Card, Dropdown, Modal, Button, Form } from "react-bootstrap";

// components
import Table from "../../components/Table";

//dummy data
import { timeSheetData as data, } from "../tables/data";
// import { FormInput } from "../../components";
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


const TimeSheet = () => {
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
            Header: "Date",
            accessor: "date",
            sort: true,
        },
        {
            Header: "Project",
            accessor: "project",
            sort: true,
        },
        {
            Header: "Assigned Hours",
            accessor: "assignedHours",
            sort: true,
        },
        {
            Header: "Hours",
            accessor: "hours",
            sort: true,
        },
        {
            Header: "Description",
            accessor: "description",
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
                                    <h4 className="header-title">Time Sheet</h4>
                                    <p className="text-muted fs-14 mb-4">A Table allowing search</p>
                                </div>
                                <button onClick={createNewDepartment} className="btn btn-primary h-50">Add Time Sheet</button>
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
                <Modal.Header style={{ width: '950px' }} className="pb-2 px-4 border-bottom-0 bg-white mx-auto" closeButton>
                    <Modal.Title id="modal-title">
                        <h5>{isDelete ? '' : isEditable ? "Edit Department" : "Add New Department"}</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: '950px' }} className="px-4 pb-4 pt-0 bg-white">
                    {
                        isDelete ? <>
                            <Col xs={8} className="text-end float-start">
                                <div>
                                    <h4 className="header-title"> Delete Department</h4>
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

                            <Form className="form-horizontal">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                Project
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Select>
                                                    <option>Office Management	</option>
                                                    <option>Project Management	</option>
                                                    <option>Video Calling App	</option>
                                                    <option>Hospital Administration	</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-date">
                                                Dateline
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
                                            <Form.Label column lg={2} htmlFor="example-email">
                                                Email
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="email"
                                                    id="example-email"
                                                    name="example-email"
                                                    placeholder="Email"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-password">
                                                Password
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="password"
                                                    id="example-password"
                                                    defaultValue="password"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-placeholder">
                                                Placeholder
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="placeholder"
                                                    id="example-placeholder"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-textarea">
                                                Text area
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control as="textarea" rows={5} id="example-textarea" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                Readonly
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="text" readOnly value="Readonly value" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                Disabled
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="text" disabled value="Disabled value" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-static">
                                                Static control
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="text"
                                                    readOnly
                                                    plaintext
                                                    id="example-static"
                                                    value="email@example.com"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-helping">
                                                Helping text
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    type="text"
                                                    id="example-helping"
                                                    placeholder="Helping text"
                                                />
                                                <span className="help-block">
                                                    <small>
                                                        A block of help text that breaks onto a new line and may
                                                        extend beyond one line.
                                                    </small>
                                                </span>
                                            </Col>
                                        </Form.Group>


                                    </Col>
                                    <Col md={6}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-fileinput">
                                                Default file input
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="file" id="example-fileinput" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-date">
                                                Date
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control id="example-date" type="date" name="date" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-month">
                                                Month
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control id="example-month" type="month" name="month" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-time">
                                                Time
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control id="example-time" type="time" name="time" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-week">
                                                Week
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control id="example-week" type="week" name="week" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-number">
                                                Number
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    id="example-number"
                                                    type="number"
                                                    name="number"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                URL
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="url" name="url" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                Search
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="search" name="search" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2}>
                                                Tel
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control type="tel" name="tel" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column lg={2} htmlFor="example-color">
                                                Color
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Control
                                                    id="example-color"
                                                    type="color"
                                                    name="color"
                                                    className="w-100"
                                                    defaultValue="#5369f8"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-0">
                                            <Form.Label column lg={2} htmlFor="example-range">
                                                Range
                                            </Form.Label>
                                            <Col lg={10}>
                                                <Form.Range className="mt-1" name="range" />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                    }

                </Modal.Body>
            </Modal>


        </>
    );
};

export default TimeSheet;