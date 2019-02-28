import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { Input, Directive} from "@angular/core";
import * as moment from 'moment';

declare var $ :any;
declare var jquery:any;


@Directive({
    selector: '[dateComparison]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateCheckValidator, multi: true }]
})
export class DateCheckValidator implements Validator {
    @Input('dateComparison') compareDate: string;
    @Input('operation') operation: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        var source =moment(control.value).add(-1, 'months').toDate();
        var target = moment(this.compareDate).add(-1, 'months').toDate();

        if(this.operation=='less than'){
            if (target < source) {
                return {
                    dateComparison: { valid: false }
                }
            }
        }
        else
        {
            if (target > source) {
                return {
                    dateComparison: { valid: false }
                }
            }
        }   
        return null;
    }
}