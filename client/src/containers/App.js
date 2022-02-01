import React from 'react';
import NavBar from '../components/NavBar';
import ProjectPage from './ProjectPage';
import ProjectPageBugs from './ProjectPageBugs';
import BugDetail from './BugDetail';
import { makeStyles } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';
import Login from './LogIn';
import Signup from './Signup';
import TryBuyPage from './TryBuyPage';
import PrivateRoute from '../components/PrivateRoute';
import CreateCompany from '../components/CreateCompany';
import Company from '../containers/Company';
import Tests from '../components/Tests/Tests';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
}))

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <NavBar style={{paddingTop : 0}} />

            <Routes>
                <PrivateRoute path="/company/:id/:bugId" exact element={<BugDetail />} /> 
                <Route path="/login" exact element={<Login />} />
                <PrivateRoute path="/" exact element={<TryBuyPage />} /> 
                <Route path="/signup" exact element={<Signup />} />
                <PrivateRoute path="/trynow" exact element={<TryBuyPage />} />
                <PrivateRoute path="/company/new" exact element={<CreateCompany />} />
                <PrivateRoute path="/company/" exact element={<Company />} />
                <PrivateRoute path="/company/:id" exact element={<ProjectPage />} /> 
                <PrivateRoute path="/company/:id/Bugs" exact element={<ProjectPageBugs />} /> 
                <Route path="/tests/" exact element={<Tests />} />
            </Routes>

        </div>
    )
}
//test
export default App;