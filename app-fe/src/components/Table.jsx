function TableHeader({ header }) {
    return <thead>
        <tr>
            {Object.entries(header).map(([key, value]) => (
                <th key={key} scope="col">{value}</th>
            ))}
        </tr>
    </thead>;
}

function TableRow({ row }) {
    return <tr>
        {Object.entries(row).map(([key, value]) => (
            <td key={key} className={value[1] ? "table-success" : "table-danger"}>
                {value[0]}
            </td>
        ))
        }
    </tr>;
}


function Table({ header_orig, rows }) {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-8 table-responsive">
                <table className="table table-hover">
                    <TableHeader header={header_orig} />
                    <tbody>
                        {Object.entries(rows).map(([key, value]) => (
                            <TableRow key={key} row={value} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
