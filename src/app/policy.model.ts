import { Profile } from "./profile.model"
import { Rule } from "./rule.model"

export class Policy{
    title: string //benchmark.title
    version:string;
    description: string //b.descr
    private _rules: Rule[] = []; // b.group.rule
    private _profile: Profile[] = []; // b.profile

    
    constructor(title: string, version: string, description: string){
        this.title = title;
        this.version = version;
        this.description = description;
    }

    public get rules(): Rule[] {
        return this._rules;
    }
    public set rules(value: Rule[]) {
        this._rules = value;
    }
  
    public get profile(): Profile[] {
        return this._profile;
    }
    public set profile(value: Profile[]) {
        this._profile = value;
    }


    
    
}