import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import NoteManagerLayout from './containers/NoteManagerLayout/NoteManagerLayout';
import NoticesList from './containers/NoticesList/NoticesList';
import CreateNotice from './containers/CreateNotice/CreateNotice';
import './App.css';

const App = props => {
    return (
        <Layout>
            <NoteManagerLayout>
                <Switch>
                    <Route path="/" exact component={NoticesList} />
                    <Route path="/directory/:dirId" component={NoticesList} />
                    <Route
                        path="/notice/create"
                        render={props => <CreateNotice {...props} isEdit={false} />}/>
                    <Route
                        path="/notice/edit/:noticeId"
                        render={props => <CreateNotice {...props} isEdit={true} />}/>
                    <Redirect to="/" />
                </Switch>
            </NoteManagerLayout>
        </Layout>
    );
};

export default App;
