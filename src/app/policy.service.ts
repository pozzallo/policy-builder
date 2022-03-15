import { Injectable } from '@angular/core';
import { Policy } from './policy.model';
import { Rule } from './rule.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor() { }

  createPolicy(data:any):Policy{
    let policy: Policy = null;
    let Benchmark = data['cdf:Benchmark'];
    let group = Benchmark['cdf:Group'][0];
    policy = new Policy(Benchmark['cdf:title'],  Benchmark['cdf:version'], Benchmark['cdf:description']);

    let rulesTemp: any[] = group['cdf:Rule'];
    
    for(let value of rulesTemp){
      let rule: Rule = new Rule(value['$']['id'], value['cdf:title'], value['cdf:description']);
      policy.rules.push(rule);
    }
    return policy;
  }
}
