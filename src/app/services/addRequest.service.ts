export class addRequestService{


    patient =[ {pname:'dina' , date:'02/12/2020',bloodtype:'O' ,quantity:9,pcase:'surgery',address:'MUST' }]

    addR(pname:string , date:any ,bloodtype:string ,quantity:number,pcase:string,address:string) {
    this.patient.push({pname:pname, date:date, bloodtype:bloodtype, quantity:quantity, pcase:pcase, address:address});
    }

}