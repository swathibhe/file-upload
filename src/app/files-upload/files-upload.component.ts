import { Component, OnInit, ViewChild } from '@angular/core';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  @ViewChild('dataTable') dataTable: MatTable<any>;
  title = 'Upload Multiple Files';
  myFiles;
  sMsg: string = '';
  selectedFiles = [];
  isChecked = false;

  displayedColumns: string[] = ['select', 'no', 'name', 'download', 'delete'];

  constructor() { }

  ngOnInit() {
    this.myFiles = [];
  }

  getFileDetails(e, typeKey) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    if (typeKey == 'old') {
      this.dataTable.renderRows();
    }
    console.log(this.myFiles, 'this.myFiles');
  }

  filesDropped(files): void {
    this.myFiles = files;
  }

  selectAll(event) {
    console.log(event);
    if (event.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    this.myFiles.forEach((item, ind) => {
      item.id = ind;
      item.isChecked = this.isChecked;
    })
    if (this.isChecked) {
      this.selectedFiles = this.myFiles;
    } else {
      this.selectedFiles = [];
    }
  }

  fileSelect(event, file, ind) {
    let isChecked;
    if (event.checked) {
      isChecked = true;
      file.isChecked = isChecked;
      file.id = ind;
      this.selectedFiles.push(file);
    } else {
      const index = this.selectedFiles.findIndex(item => item.id === ind);
      this.selectedFiles.splice(index, 1);
    }
  }

  downloadSelected() {
    const name = 'download-selected-files.zip';
    this.zipDownland(this.selectedFiles, name);
    this.clearData();
  }
  zipDownland(files, name) {
    if (files.length) {
      var zip = new JSZip();
      for (let counter = 0; counter < files.length; counter++) {
        const element = files[counter];
        const fileData: any = (element);
        zip.file(fileData.name, fileData, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        FileSaver.saveAs(content, name);
      });
    }
  }

  deleteSelected() {
    const selectedFile = JSON.parse(JSON.stringify(this.selectedFiles))
    selectedFile.forEach((item) => {
      const selectedInd = this.selectedFiles.findIndex(se => se.id === item.id);
      this.selectedFiles.splice(selectedInd, 1);
      const fileInd = this.myFiles.findIndex(se => se.id === item.id);
      this.myFiles.splice(fileInd, 1);
    });
    if (this.myFiles.length > 0) {
      this.dataTable.renderRows();
    }
    this.clearData();
  }
  clearData() {
    this.isChecked = false;
    this.selectedFiles = [];
    this.myFiles.forEach(item => {
      item.isChecked = false;
    });
  }

  deleteFile(ind) {
    this.myFiles.splice(ind, 1);
    if (this.selectedFiles.length) {
      const index = this.selectedFiles.findIndex(item => item.id === ind);
      this.selectedFiles.splice(index, 1);
    }
    if (this.myFiles.length > 0) {
      this.dataTable.renderRows();
    }
  }

  downloadFile(file) {
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.setAttribute("href", window.URL.createObjectURL(file));
    downloadLink.setAttribute("download", file.name);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
