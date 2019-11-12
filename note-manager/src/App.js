import React from 'react';
import Layout from './hoc/Layout/Layout';
import NoteManager from './containers/NoteManager/NoteManager';
import './App.css';

const App = props => {
    return (
        <Layout>
            <NoteManager />
        </Layout>
    );
};

export default App;
