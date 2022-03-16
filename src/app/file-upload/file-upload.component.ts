import { Component, Input, OnInit } from '@angular/core';
import { Policy } from '../policy.model';
import * as xml2js from 'xml2js';
import { PolicyService } from '../policy.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

 @Input() fileToUpload: File;
  parser: xml2js.Parser;
  policy: Policy;
  policyForm: FormGroup;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.parser = new xml2js.Parser();
    this.getFileAsString(this.fileToUpload).then((xmlString: string) => {
      this.parser.parseString(xmlString, (err, result) => {
        console.log(result);
        console.log(err);
        this.policy = this.policyService.createPolicy(result);
        this.initForm();
      })
    });
  }

  initForm(){
    this.policyForm = new FormGroup({
      title: new FormControl(this.policy.title),
      version: new FormControl(this.policy.version),
      desc: new FormControl(this.policy.description)
    })
  }

  getFileAsString(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  parseXml(xmlString: string): Document {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xmlString, "text/xml");
    return doc;
  }


}
