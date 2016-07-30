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
                    <a className='btn btn-default col-md-2' onClick={this.handleToggle}> Edit </a>
                    <a className='btn btn-danger col-md-2 btn-gaps' onClick={this.handleDelete}> Delete</a>
                </td>
            </tr>
        );
    },
    recordForm: function () {
        return (
            <tr>
                <td>
                    <input className='form-control'
                        type='text'
                        defaultValue={this.props.date}
                        ref='date'/>
                </td>
                <td>
                    <input className='form-control'
                        type='text'
                        defaultValue={this.props.title}
                        ref='title'/>
                </td>
                <td>
                    <input className='form-control'
                        type='number'
                        defaultValue={this.props.amount}
                        ref='amount'/>
                </td>
                <td>
                    <a className='btn col-md-2 btn-default' onClick={this.handleEdit}> Update </a>
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