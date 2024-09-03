import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function SaleCard(props) {
  return (
    <Card sx={{minWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://media.istockphoto.com/id/1291627052/vector/abstract-geometric-pattern-artwork-retro-colors-and-white-background.jpg?s=612x612&w=0&k=20&c=_kuxrGmEczm8UF0S-AfJvWifn7K5pJsd4mZQl2lVVPg="
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="h4" >
             {props.data} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
         View
        </Button>
      </CardActions>
    </Card>
  );
}


export default SaleCard;