import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../component/login'
import Inscription from '../component/inscription';
import Cashin from '../component/cashin.component/cashin';
import Transfer from '../component/transfer.component/transfer';
import Cashout from '../component/cashout.component/cashout';
import Echeance from '../component/echeance.component/echeance';
import Home from '../component/home.component/home';
import Tontine from '../component/tontine.component/tontine';

import Token from '../component/token.component/token'






class Routes extends Component {
    render() {
        return (<Switch>
            {/* <Route path="/" exact component={Login} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/Signup" component={Inscription} />
            <Route path="/home" component={Home} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/cashin" component={Cashin} />
            <Route path="/cashout" component={Cashout} />
            <Route path="/tontine" component={Tontine} />
            <Route path="/echeance" component={Echeance} />
            <Route path="/token" component={Token} />
            <Route component={Login} />
        </Switch>

        );
    }
}

export default Routes