var AmountBox = React.createClass({

    render: function() {
        return (
            <div className='col-md-4'>
                <div className={ "panel panel-" + this.props.type }>
                    <div className='panel-heading'>
                        <span className='text-uppercase text-center amount-header'> { this.props.text } </span>
                    </div>
                    <div className='panel-body'>
                        <span className='amount-content text-center'> { amountFormat(this.props.amount) } </span>
                    </div>
                </div>
            </div>
        );
    }

});
