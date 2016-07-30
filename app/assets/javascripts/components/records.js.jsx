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
        var records = React.addons.update(this.state.records, { $push: [record] })
        this.setState({records: records});
    },
    deleteRecord: function (record) {
        var indexOfDeletedRecord = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, { $splice: [[indexOfDeletedRecord, 1]] });
        this.replaceState({records: records});
    },
    credits: function () {
        var credits = this.state.records.filter( function (val) {
            return val.amount >= 0;
        });

        return credits.reduce (function (prev, curr) {
            return prev + parseFloat(curr.amount)
        }, 0);
    },
    debits: function () {
        var debits = this.state.records.filter( function (val) {
            return val.amount < 0;
        });

        return debits.reduce (function (prev, curr) {
            return prev + parseFloat(curr.amount)
        }, 0);
    },
    balance: function () {
        return this.debits() + this.credits();
    },
    updateRecord: function (record, data) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] });
        this.replaceState({records: records});
    },
    render: function() {
        var recordRow = this.state.records.map(function (record) {
            return <Record
                key={record.id}
                record={record}
                handleDeleteRecord={ this.deleteRecord }
                handleEditRecord={ this.updateRecord } />
        }, this);

        return (
            <div className="records">
                <h2 className="title">Records</h2>
                <AmountBox type='success' amount={ this.credits() } text='credit'/>
                <AmountBox type='danger' amount={ this.debits() } text='debit'/>
                <AmountBox type='info' amount={ this.balance() } text='balance'/>
                <div>
                    <h2> Create Record </h2>
                    <RecordForm handleNewRecord={this.addRecord}/>
                </div>
                <hr/>
                <table className='table table-bordered records-table'>
                    <thead>
                        <tr>
                            <th className='text-center'>
                                <div className='sorts-label'>
                                    <span>Date</span>
                                </div>
                                <div className='sorts-icons'>
                                    <span className="glyphicon glyphicon-triangle-top"></span>
                                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                                </div>
                            </th>
                            <th className='text-center'>
                                <div className='sorts-label'>
                                    <span>Title</span>
                                </div>
                                <div className='sorts-icons'>
                                    <span className="glyphicon glyphicon-triangle-top"></span>
                                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                                </div>
                            </th>
                            <th className='text-center'>
                                <div className='sorts-label'>
                                    <span>Amount</span>
                                </div>
                                <div className='sorts-icons'>
                                    <span className="glyphicon glyphicon-triangle-top"></span>
                                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                                </div>
                            </th>
                            <th className='text-center'><div className='actions'>Actions</div></th>
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
