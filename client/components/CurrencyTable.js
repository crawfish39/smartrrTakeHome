import React from "react";
import { Table } from '@mui/material';
import {TableBody} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableContainer} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableRow} from '@mui/material';
import {Paper} from '@mui/material';

export default function CurrencyTable ({currency}){
  return(
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense tabel">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600}} colSpan={4}>Base Currency</TableCell>
              <TableCell sx={{ fontWeight: 600 }} colSpan={3}>Converted Currency</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} title='baseCode'>Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title='baseName'>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title='amount'>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title='dateUpdated'>Date Updated</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title= 'conversionCode'>Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title='conversionName'>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }} title='conversionRate'>Conversion Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
       {currency.map((el,i) =>{
        const time = `${el['updated_date']} ${"\n"} ${el['timeStamp']}`
        return (
          <TableRow data-testid='row'
            key={time}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{el['base_currency_code']}</TableCell>
              <TableCell>{el['base_currency_name']}</TableCell>
              <TableCell>{el['amount']}</TableCell>
              <TableCell>{time}</TableCell>
              <TableCell>{Object.keys(el['rates'])}</TableCell>
              <TableCell>{el['rates']['BRL']['currency_name']}</TableCell>
              <TableCell>{el['rates']['BRL']['rate']}</TableCell>
          </TableRow>
        ) 
      })}
          </TableBody>
        </Table>
      </TableContainer>
      <p><em>updated hourly</em></p>
    </>
  )
}
