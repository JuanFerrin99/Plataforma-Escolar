import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';


export default function cursoCard({ nombre, id, dni }) {

    return (
        <Grid item xs={3} margin={2.5}>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {`${nombre}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button LinkComponent={Link} to={`curso`} state={{idCurso : id, dni : dni}} size="small">Ir a curso</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}