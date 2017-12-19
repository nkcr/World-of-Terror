export default class Info {


     info_attack_name:any;
     info_attack_date:any;
     info_attack_success:any;
     info_attack_perpetrator:any;
     info_attack_target:any;
     info_attack_description:any;

     db:any;

     constructor() {

     }

     initInfo(db:any) {
        this.db=db;
        this.info_attack_name=document.getElementById("info_attack_name");
        this.info_attack_date=document.getElementById("info_attack_date");
        this.info_attack_success=document.getElementById("info_attack_success");
        this.info_attack_perpetrator=document.getElementById("info_attack_perpetrator");
        this.info_attack_target=document.getElementById("info_attack_target");
        this.info_attack_description=document.getElementById("info_attack_description");
     }

     updateInfo(i:number){
        console.log("Info - updateInfo");

        let attackType = this.db[i][29];
        let dateOfAttack:string = this.db[i][1] + '/' + this.db[i][2] + '/' + this.db[i][3];
        let gname:string = this.db[i][58];
        let targetType:string = this.db[i][35];

        let success_url =  "assets/images/success/" + this.db[i][26] + ".png";
        let success_img = '<img src=' + success_url +  ' height=25 width=25/>';

        let summary:string = this.db[i][18];
        if(!summary){
         summary = 'Sorry, no summary is available.';
        }

        this.info_attack_name.innerHTML = attackType;
        this.info_attack_date.innerHTML = dateOfAttack;
        this.info_attack_success.innerHTML = success_img;
        this.info_attack_perpetrator.innerHTML = gname
        this.info_attack_target.innerHTML = targetType;

        this.info_attack_description.innerHTML = summary;
     }





 }
