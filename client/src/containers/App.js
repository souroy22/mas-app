import React from 'react';
import NavBar from '../components/NavBar';
import ProjectPage from './ProjectPage';
import PPReport from './PPReport';
import Tickets from './Tickets';
import Social from './Social';
import PPDocs from './PPDocs';
import PPTasks from './PPTasks';
import Settings from './Settings';
import SettingUser from './SettingUser';
import SettingCompany from './SettingCompany';
import HelpDocs from './HelpDocs';
import ReferAndEarn from './ReferAndEarn';
import PPusecase from './PPusecase';
import ProjectPageBugs from './ProjectPageBugs';
import ProjectPageNotes from './ProjectPageNotes/index';
import Title from './ProjectPageNotes/Title';
import USETitle from './PPusecase/USETitle';
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
import ChatBody from '../components/ChatComponents/component/ChatBody';

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
                <Route path="/support/chat" exact element={<ChatBody />} />
                <PrivateRoute path="/trynow" exact element={<TryBuyPage />} />
                <PrivateRoute path="/company/new" exact element={<CreateCompany />} />
                <PrivateRoute path="/company/" exact element={<Company />} />
                <PrivateRoute path="/company/:id" exact element={<ProjectPage />} /> 
                <PrivateRoute path="/company/:id/Report" exact element={<PPReport />} /> 
                <PrivateRoute path="/company/:id/Tickets" exact element={<Tickets />} /> 
                <PrivateRoute path="/company/:id/Social" exact element={<Social />} /> 
                <PrivateRoute path="/company/:id/Docs" exact element={<PPDocs />} /> 
                <PrivateRoute path="/company/:id/usecase" exact element={<PPusecase />} /> 
                <PrivateRoute path="/company/:id/Tasks" exact element={<PPTasks />} /> 
                <PrivateRoute path="/company/:id/ReferAndEarn" exact element={<ReferAndEarn />} /> 
                <PrivateRoute path="/company/:id/HelpDocs" exact element={<HelpDocs />} /> 
                <PrivateRoute path="/company/:id/Settings" exact element={<Settings />} /> 
                <PrivateRoute path="/company/:id/Settings/SettingUser" exact element={<SettingUser />} /> 
                <PrivateRoute path="/company/:id/Settings/SettingCompany" exact element={<SettingCompany />} /> 
                <PrivateRoute path="/company/:id/Bugs" exact element={<ProjectPageBugs />} /> 
                <PrivateRoute path="/company/:id/Notes" exact element={<ProjectPageNotes />} /> 
                <PrivateRoute path="/company/:id/usecase/Title" exact element={<USETitle />} /> 
                <PrivateRoute path="/company/:id/Notes/Title" exact element={<Title />} /> 
                <Route path="/tests/" exact element={<Tests />} />
            </Routes>

        </div>
    )
}
//test
export default App;