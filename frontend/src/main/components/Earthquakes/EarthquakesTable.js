import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
// import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function EarthquakesTable({ earthquakes, currentUser }) {

    const navigate = useNavigate();

    //const editCallback = (cell) => {
        //navigate(`/earthquakes/edit/${cell.row.values.id}`)
    //}

    //// Stryker disable all : hard to test for query caching

    //const deleteMutation = useBackendMutation(
        //cellToAxiosParamsDelete,
        //{ onSuccess: onDeleteSuccess },
        //["/api/earthquakes/all"]
    //);
    //// Stryker enable all

    //// ssStryker isable next-line all : TODO try to make a good test for this
    ////const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }
    //// no such operation exists for earthquake


    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Magnitude',
            accessor: 'mag',
        },
        {
            Header: 'Place',
            accessor: 'place',
        },
        {
            Header: 'Time',
            accessor: 'time',
        }
    ];

    //if (hasRole(currentUser, "ROLE_ADMIN")) {
        //columns.push(ButtonColumn("Edit", "primary", editCallback, "EarthquakesTable"));
        //columns.push(ButtonColumn("Delete", "danger", deleteCallback, "EarthquakesTable"));
    //}

    // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedEarthquakes = React.useMemo(() => earthquakes, [earthquakes]);

    return <OurTable
        data={memoizedEarthquakes}
        columns={memoizedColumns}
        testid={"EarthquakesTable"}
    />;
};
