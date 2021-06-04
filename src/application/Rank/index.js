import React, { Fragment } from 'react';

function Rank() {
    return (
        <Fragment>
            <p>this is component rank</p>
        </Fragment>
    )
}

export default React.memo(Rank);