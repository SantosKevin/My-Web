import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
 
@Pipe({
  name: 'hourCommentary'
})

export class HourComment implements PipeTransform{

    transform(value: Date): String {
        //let a = moment("June 10, 2020");
        //value = a.toDate();
        let now = moment();
        let comment = "";
        let diff = now.diff(value,'seconds');
        if(diff == 0)
            return comment = "just now.";
        else{
            if( diff > 60){
                diff = now.diff(value, 'minutes');
                comment = "minutes ago.";
                if(diff > 60){
                    diff = now.diff(value, 'hours');
                    comment = "hours ago.";
                    if(diff > 24){
                        diff = now.diff(value, 'days');
                        comment = "days ago.";
                        if(diff > 31){
                            diff = now.diff(value, 'months');
                            comment = "months ago.";
                        }
                    }
                }
            }
        }
        
        return  diff + " " + comment;
    }

}
