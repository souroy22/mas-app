import MaterialTable from 'material-table';
import React from 'react';

import tableIcons from '../TableIcons';

import { useLocation, useNavigate } from 'react-router-dom';

const Tests = ({bugs=[]}) => {

    let navigate = useNavigate();
    let location = useLocation();

    const columns = [
        {field: 'id', title: 'ID'},
        {field: 'subject', title: 'Subject'},
        {field: 'assignee', title: 'Assignee'},
        {field: 'priority', title: 'Priority'},
        {field: 'due', title: 'Due Date'}
    ]

    var rows = bugs.map(({id, assignee, subject, priority, dueDate}) => (
        {id: id, subject, assignee, priority, due: new Date(dueDate).toLocaleDateString("en-US")}
    ))

    return (
        <div style={{width: '100%', zIndex: 1, position: 'relative'}}>
            <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={rows}
                title=""
                option={{
                    rowStyle: {fontFamily: 'Lato'}
                }}
                onRowClick={(_, rowData) => {
                    navigate(`${location.pathname}/${rowData.id}`, {state: bugs[rowData.tableData.id]})
                }}
            />
        </div>
    )
}

export default React.memo(Tests);