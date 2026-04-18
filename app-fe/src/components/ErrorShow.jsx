
function ErrorShow(props) {
    return (
        <>
            <div className="row">
                <div className="col-sm-12 py-2">
                    {props.error && <p className="text-danger">{props.error}</p>}
                </div>
            </div>
        </>
    )
}

export default ErrorShow;