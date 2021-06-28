import * as React from "react";
import { Line } from 'react-chartjs-2';
import { Card } from '@material-ui/core';
import DollarIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import PeopleIcon from '@material-ui/icons/People';
import CardWithIcon from './CardWithIcon'

const Dashboard = () => {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "Purchases for 2021",
            data: [63, 110, 89, 95],
            fill: true,
            backgroundColor: "rgba(64,220,36,0)",
            borderColor: "rgba(64,220,36,0.6)"
          },
          {
            label: "Purchases for 2020",
            data: [20, 55, 75, 61],
            fill: true,
            backgroundColor: "rgba(220,64,36,0)",
            borderColor: "rgba(220,64,36,0.6)"
          }

        ]
      };
      return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <CardWithIcon icon={DollarIcon} title="Monthly Revenue" subtitle="₪5,670"/>
                <CardWithIcon icon={ShoppingCartIcon} title="Orders this month" subtitle="95"/>
            </div>
            <div className="row justify-content-center">
                <CardWithIcon icon={VideogameAssetIcon} title="Our Bestseller" subtitle="ASUS XONAR AE"/>
                <CardWithIcon icon={PeopleIcon} title="Customers this month" subtitle="80" />
            </div>
            <br/>
            <div className="my-2 row justify-content-center">
                <Card className="col-7">
                    <Line data={data} options={{
                        title: { text:"2021 Orders" ,display: true },
                        scales: { yAxes: [ {ticks:{beginAtZero:true}} ] }
                    }}/>    
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;