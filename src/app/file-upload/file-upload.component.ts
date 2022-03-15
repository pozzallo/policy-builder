import { Component, OnInit } from '@angular/core';
import { Policy } from '../policy.model';
import * as xml2js from 'xml2js';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File | null = null;
  parser: xml2js.Parser;
  policy: Policy;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.parser = new xml2js.Parser();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.getFileAsString(this.fileToUpload).then((xmlString: string) => {
      this.parser.parseString(xmlString, (err, result) => {
        console.log(result);
        this.policy = this.policyService.createPolicy(result);
      })
    });
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
