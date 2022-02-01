import { makeStyles, Typography, Grid, Card, CardContent, CardActions, Button } from "@material-ui/core";

import React from 'react';

import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { handle } from "../../utils/helpers";
import api from "../../redux/api";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}))

const Company = () => {
    const classes = useStyles();
    const [cookies] = useCookies(['user']);
    const user = useSelector(state => state.authentication.user);
    const [companies, setCompanies] = React.useState([]);
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        if (user !== null && user.id) {
            const config = {
                headers: { Authorization: `Bearer ${cookies.user.token}` }
            }

            const [result,error] = await handle(api.get(`company/${user.id}`, config))

            if (!error) {
                const companies = result.data
                setCompanies(companies)
            }
        }
    }

    React.useEffect(() => {
        if (user && user.licenseInfo === "unpaid" && user.daysRemaining === null) {
            navigate("/")
        } else {
            fetchCompanies()
        }
    }, [user])

    return (
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />

            <Grid container justify="center" spacing={2} style={{marginTop: '5%'}}>
                <Grid item xs={10}>
                    <Grid container justify="flex-end">
                        <Button variant="contained" onClick={() => {
                            navigate('/company/new')
                        }}>Add a Company</Button>
                    </Grid>
                </Grid>
                {
                    companies.map(company => (
                        <Grid item xs={3} key={company.id}>
                            <Card onClick={() => navigate(`/company/${company.id}`)}>
                                <CardContent>
                                    <Typography>Company Name: {company.companyName}</Typography>

                                    <Typography>Company Email: {company.email}</Typography>

                                    <Typography>Company Phone: {company.phone}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

export default Company;