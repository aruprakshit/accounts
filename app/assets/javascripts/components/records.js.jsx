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
        var records = this.state.records.slice();
        records.push(record);
        this.setState({records: records});
    },
    deleteRecord: function (record) {
        var records = this.state.records.slice();
        var indexOfDeletedRecord = records.indexOf(record);
        records.splice(indexOfDeletedRecord, 1);
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
    render: function() {
        var recordRow = this.state.records.map(function (record) {
            return <Record key={record.id} record={record} handleDeleteRecord={ this.deleteRecord }/>
        }, this);

        return (
            <div className="records">
                <h2 className="title">Records</h2>
                <AmountBox type='success' amount={ this.credits() }> Credit </AmountBox>
                <AmountBox type='danger' amount={ this.debits() }> Debit </AmountBox>
                <AmountBox type='info' amount={ this.balance() }> Balance </AmountBox>
                <RecordForm handleNewRecord={this.addRecord}/>
                <hr/>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
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
