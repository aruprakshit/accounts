var Records = React.createClass({
    getInitialState: function () {
        return {
            records: this.props.data
        };
    },
    getDefaultProps: function () {
        return {
            records: []
        };
    },
    addRecord: function (record) {
        records = this.state.records.slice();
        records.push(record);
        this.setState({records: records});
    },
    render: function() {
        var recordRow = this.state.records.map(function (record) {
            return <Record key={record.id} record={record}/>
        });

        return (
            <div className="records">
                <h2 className="title">Records</h2>
                <RecordForm handleNewRecord={this.addRecord}/>
                <hr/>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordRow}
                    </tbody>
                </table>
            </div>
        );
    }
});
