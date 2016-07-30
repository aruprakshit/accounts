var Record = React.createClass({
    getInitialState: function () {
        return {
            edit: false
        }
    },
    handleToggle: function (e) {
        e.preventDefault();
        this.setState({
            edit: !this.state.edit
        });
    },
    handleDelete: function (e) {
        e.preventDefault();
        $.ajax({
            method: 'delete',
            url: '/records/' + this.props.record.id,
            dataType: 'json',
            success: function (data) {
                this.props.handleDeleteRecord(this.props.record);
            }.bind(this)
        })
    },
    recordRow: function () {
        return (
            <tr>
                <td> { this.props.record.date }</td>
                <td> { this.props.record.title }</td>
                <td> { amountFormat(this.props.record.amount) }</td>
                <td>
                    <a className='btn btn-primary col-md-2' onClick={this.handleToggle}> Edit </a>
                    <a className='btn btn-danger col-md-2 btn-gaps' onClick={this.handleDelete}> Delete</a>
                </td>
            </tr>
        );
    },
    handleEdit: function (e) {
        e.preventDefault();
        var data = {
            title: this.refs.title.value,
            date:  this.refs.date.value,
            amount: this.refs.amount.value
        };

        $.ajax({
            method: 'put',
            url: "/records/" + this.props.record.id,
            dataType: 'json',
            data: {
                record: data
            },
            success: function (data) {
                this.setState({edit: false});
                this.props.handleEditRecord(this.props.record, data);
            }.bind(this)
        });
    },
    recordForm: function () {
        return (
            <tr>
                <td>
                    <input className='form-control'
                        type='text'
                        defaultValue={this.props.record.date}
                        ref='date'/>
                </td>
                <td>
                    <input className='form-control'
                        type='text'
                        defaultValue={this.props.record.title}
                        ref='title'/>
                </td>
                <td>
                    <input className='form-control'
                        type='number'
                        defaultValue={this.props.record.amount}
                        ref='amount'/>
                </td>
                <td>
                    <a className='btn col-md-2 btn-success' onClick={this.handleEdit}> Update </a>
                    <a className='btn col-md-2 btn-danger btn-gaps' onClick={this.handleToggle}> Cancel </a>
                </td>
            </tr>
        )
    },
    render: function() {
        if (this.state.edit) {
            return this.recordForm();
        } else {
            return this.recordRow();
        }
    }

});
