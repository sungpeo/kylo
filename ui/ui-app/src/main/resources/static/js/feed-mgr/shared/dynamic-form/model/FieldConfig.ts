import {AbstractControlOptions} from "@angular/forms/src/model";
import {AsyncValidatorFn, ValidatorFn} from "@angular/forms/src/directives/validators";
import {FormGroup} from "@angular/forms";
import {StaticText} from "./StaticText";
import {SectionHeader} from "./SectionHeader";

export type NgIfCallback = (form:FormGroup) => boolean;

export type OnFieldChange = (newValue:any,form:FormGroup,model?:any) =>void;

export type GetErrorMessage = (type:string,validationResponse:any,form:FormGroup) =>string;

const NgIfTrue:NgIfCallback = (form:FormGroup)=> { return true};

export class FieldConfig<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder:string;
    model?:any;
    hint?:string;
    readonlyValue:string;
    modelValueProperty:string;
    pattern?:string;
    onModelChange?:OnFieldChange;
    validators?: ValidatorFn[] | null;
    disabled?:boolean;
    placeholderLocaleKey?:string;
    labelLocaleKey?:string;
    styleClass:string;
    ngIf?:NgIfCallback
    getErrorMessage?:GetErrorMessage

    constructor(options: {
        value?: T,
        key?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        placeholder?:string,
        model?:any,
        hint?:string,
        readonlyValue?:string,
        modelValueProperty?:string,
        pattern?:string,
        disabled?:boolean,
        placeholderLocaleKey?:string,
        styleClass?:string,
        validators?:ValidatorFn[],
        ngIf?:NgIfCallback,
        onModelChange?:OnFieldChange,
        getErrorMessage?:GetErrorMessage,
    } = {}) {
        this.modelValueProperty = options.modelValueProperty  || 'value'
        this.value = options.value;
        this.key = options.key || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder || '';
        this.model = (options.model && options.model.hasOwnProperty(this.modelValueProperty)) ? options.model : this;
        this.hint = options.hint || '';
        this.readonlyValue = options.readonlyValue || this.model.value;
        this.pattern = options.pattern;
        this.disabled = options.disabled || false;
        this.styleClass = options.styleClass || '';

        this.placeholderLocaleKey = options.placeholderLocaleKey;
        this.validators = options.validators;
        this.ngIf = options.ngIf ? options.ngIf : NgIfTrue ;
        this.onModelChange = options.onModelChange;
        this.getErrorMessage = options.getErrorMessage;


    }
    isStaticText(){
        return this.controlType == "static-text" || this.controlType == "section-header"
    }

    setModelValue(value:any){
        this.model[this.modelValueProperty]= value;
    }

    getModelValue():any {
        return this.model[this.modelValueProperty];
    }


}