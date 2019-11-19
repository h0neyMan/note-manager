import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import NoteManagerLayout from './containers/NoteManagerLayout/NoteManagerLayout';
import NoticesList from './containers/NoticesList/NoticesList';
import './App.css';

const App = props => {
    return (
        <Layout>
            <NoteManagerLayout>
                <Switch>
                    <Route path="/" exact component={NoticesList} />
                    <Redirect to="/" />
                </Switch>
            </NoteManagerLayout>
        </Layout>
    );
};

export default App;
