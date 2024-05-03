
import { Row, Col, Card, Dropdown, Modal, Button } from "react-bootstrap";

// components
import Table from "../../components/Table";

//dummy data
import { designationsData as data, } from "../tables/data";
import { FormInput } from "../../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CalendarApp from "../apps/Calendar";
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

const ShiftScheduling = () => {
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
            <CalendarApp />
        </>
    );
};

export default ShiftScheduling;