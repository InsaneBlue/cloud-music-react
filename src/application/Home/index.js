import React, { Fragment } from 'react';

function Home() {
    return (
        <Fragment>
            <p>this is component home</p>
        </Fragment>
    )
}

export default React.memo(Home);